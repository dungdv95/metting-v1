import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import media from "main/room/media";
import message from "main/room/components/message";
import { actions } from "main/room/store";

function useLocalShareStream() {
  const dispatch = useDispatch();
  const sharingMode = useSelector(({ screensharing }) => screensharing.mode);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    if (sharingMode === "requesting") {
      let ignore = false;

      media
        .getShareStream()
        .then((s) => {
          if (ignore) {
            message.warning("Đã có thành viên trong phòng chia sẻ màn hình");
            s.getTracks().forEach((t) => t.stop());
            return;
          }

          s.getVideoTracks()[0].onended = () => {
            dispatch(actions.setScreenSharingModeOff());
          };

          setStream(s);
          dispatch(actions.setScreenSharingModeLocal());
        })
        .catch((error) => {
          console.log(error);
          dispatch(actions.setScreenSharingModeOff());
        });

      return () => {
        ignore = true;
      };
    }

    if (sharingMode === "off" || sharingMode === "remote") {
      setStream(null);
    }
  }, [dispatch, sharingMode]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [stream]);

  return stream;
}

export default useLocalShareStream;
