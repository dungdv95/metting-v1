import api from "api";
import useMediasoupInstance from "main/room/hooks/use-mediasoup-instance";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function useSyncLocalCamTrack(track) {
  const mediasoup = useMediasoupInstance();
  const roomId = useSelector(({ room }) => room.id);
  const ioConnectionId = useSelector(({ room }) => room.socketio.connectionId);

  useEffect(() => {
    if (track) {
      mediasoup.createCamProducer(track).catch(console.log);
    }

    return () => {
      if (track) {
        api.connectionTurnOffcam({ roomId, ioConnectionId }).catch(console.log);
      }
    };
  }, [track, roomId, ioConnectionId, mediasoup]);
}

export default useSyncLocalCamTrack;
