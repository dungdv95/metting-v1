import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useBackgroundTransformer } from "main/room/hooks";
import media from "main/room/media";

function useCamTrackWithBackground() {
  const [track, setTrack] = useState(null);
  const transformer = useBackgroundTransformer();
  const bg = useSelector(({ device }) => device.bgSetting.current);
  const deviceId = useSelector(({ device }) => device.cam.current);

  useEffect(() => {
    let tempTrack;

    media
      .getCamStreamBG({ deviceId })
      .then((stream) => {
        tempTrack = transformer.transform(stream.getVideoTracks()[0]);
        setTrack(tempTrack);
      })
      .catch(console.log);

    return () => {
      tempTrack?.stop();
    };
  }, [deviceId, transformer]);

  useEffect(() => {
    if (bg === "blur") {
      transformer.configure({ bgBlur: true });
      return;
    }

    if (bg === "off") {
      return () => {
        transformer.stopStream();
      };
    }

    transformer.configure({ bgImage: bg });
  }, [bg, transformer]);

  return track;
}

export default useCamTrackWithBackground;
