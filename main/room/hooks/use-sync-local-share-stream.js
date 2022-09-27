import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useMediasoupInstance from "main/room/hooks/use-mediasoup-instance";
import useJanusInstance from "main/room/hooks/use-janus-instance";
import { actions } from "main/room/store";

function useSyncLocalShareStream(localshareStream) {
  const dispatch = useDispatch();
  const janus = useJanusInstance();
  const mediasoup = useMediasoupInstance();

  useEffect(() => {
    if (localshareStream) {
      localshareStream.getVideoTracks()[0].onended = () => {
        dispatch(actions.setScreenSharingModeOff());
      };
    }
  }, [localshareStream, dispatch]);

  useEffect(() => {
    if (localshareStream) {
      const videoTrack = localshareStream.getVideoTracks()[0];
      mediasoup.createScreenProducer(videoTrack).catch(console.log);
    }
  }, [localshareStream, mediasoup]);

  useEffect(() => {
    if (localshareStream) {
      const audioTrack = localshareStream.getAudioTracks()[0];

      if (audioTrack) {
        janus.mixAudioTrack(audioTrack);
      }
    }
  }, [localshareStream, janus]);
}

export default useSyncLocalShareStream;
