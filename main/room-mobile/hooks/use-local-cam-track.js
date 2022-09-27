import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function useLocalCamTrack() {
  const camEnable = useSelector(({ device }) => device.cam.enable);
  const [track, setTrack] = useState(null);

  useEffect(() => {
    if (camEnable) {
      let tempTrack;

      navigator.mediaDevices
        .getUserMedia({ video: { aspectRatio: 16 / 9 }, audio: false })
        .then((stream) => {
          tempTrack = stream.getVideoTracks()[0];
          setTrack(stream.getVideoTracks()[0]);
        })
        .catch(console.log);

      return () => {
        if (tempTrack) {
          tempTrack.stop();
        }
      };
    }

    setTrack(null);
  }, [camEnable]);

  return track;
}

export default useLocalCamTrack;
