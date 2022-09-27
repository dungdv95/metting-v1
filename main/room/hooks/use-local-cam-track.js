import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useBackgroundTransformer from "main/room/hooks/use-bg-transformer";
import { actions } from "main/room/store";
import message from "main/room/components/message";
import media from "main/room/media";

function useLocalCamTrack() {
  const transformer = useBackgroundTransformer();
  const deviceId = useSelector(({ device }) => device.cam.current);
  const camEnable = useSelector(({ device }) => device.cam.enable);
  const bg = useSelector(({ device }) => device.cam.bg.current);
  const dispatch = useDispatch();

  const [track, setTrack] = useState(null);

  useEffect(() => {
    if (!camEnable) {
      setTrack(null);
      return;
    }

    let tempTrack;
    let ignore = false;

    if (bg === "off") {
      media
        .getCamStream({ deviceId })
        .then((stream) => {
          tempTrack = stream.getVideoTracks()[0];
          tempTrack.onended = () => {
            dispatch(actions.toggleCamEnable());
            message.error("Có lỗi sảy ra! Mời bạn thử lại");
          };
          if (!ignore) {
            setTrack(stream.getVideoTracks()[0]);
          }
        })
        .catch(() => {
          dispatch(actions.toggleCamEnable());
          message.error("Có lỗi sảy ra! Mời bạn thử lại");
        });
    }

    if (bg !== "off") {
      media
        .getCamStream({ deviceId })
        .then((stream) => {
          tempTrack = stream.getVideoTracks()[0];
          tempTrack.onended = () => {
            dispatch(actions.toggleCamEnable());
            message.error("Có lỗi sảy ra! Mời bạn thử lại");
          };
          if (!ignore) {
            setTrack(stream.getVideoTracks()[0]);
          }
        })
        .catch(() => {
          dispatch(actions.setBackgroundSetting("off"));
          dispatch(actions.toggleCamEnable());
          message.error("Có lỗi sảy ra! Mời bạn thử lại");
        });
    }

    return () => {
      ignore = true;

      if (tempTrack) {
        tempTrack.stop();
      }
    };
  }, [deviceId, camEnable, bg, transformer, dispatch]);

  useEffect(() => {
    transformer.configure({ bg });
  }, [bg, transformer]);

  if (bg === "off" || track === null) {
    return track;
  }
  if (!camEnable) {
    return null;
  }
  return transformer.transform(track);
}

export default useLocalCamTrack;
