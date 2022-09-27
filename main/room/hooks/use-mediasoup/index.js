import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Mediasoup from "main/room/hooks/use-mediasoup/mediasoup";

import { actions } from "main/room/store";

import apis from "api";

function useMediasoup() {
  const dispatch = useDispatch();
  const mediasoup = useRef(null);
  const roomId = useSelector(({ room }) => room.id);
  const ioConnectionId = useSelector(({ room }) => room.socketio.connectionId);
  const ready = useSelector(({ room }) => room.mediasoup.ready);
  const sharingMode = useSelector(({ screensharing }) => screensharing.mode);

  const exportApis = useMemo(() => {
    return {
      createConsumer: async (consumerInfo) => {
        return await mediasoup.current.createConsumer(consumerInfo);
      },
      createScreenProducer: async (track) => {
        return await mediasoup.current.produce({
          source: "display-media",
          track,
        });
      },
      createCamProducer: async (track) => {
        return await mediasoup.current.produce({
          source: "user-media",
          encodings: [
            { maxBitrate: 500000, scaleResolutionDownBy: 2 },
            { maxBitrate: 1000000, scaleResolutionDownBy: 1 },
          ],
          track,
        });
      },
    };
  }, []);

  useEffect(() => {
    if (roomId === "" || ioConnectionId === "") {
      console.warn("[mediasoup] roomId or ioConnectionId empty!");
      return;
    }

    mediasoup.current = new Mediasoup({ roomId, ioConnectionId });

    mediasoup.current
      .setup()
      .then(() => {
        dispatch(actions.setMediasoupReady(true));
      })
      .catch(console.log);

    return () => {
      mediasoup.current?.close();
    };
  }, [roomId, ioConnectionId, dispatch]);

  useEffect(() => {
    if (ready) {
      apis.requestShareInfo({ roomId, ioConnectionId }).catch(console.log);
    }
  }, [ready, roomId, ioConnectionId]);

  useEffect(() => {
    return () => {
      if (sharingMode === "local") {
        apis
          .connectionStopShareScreen({ roomId, ioConnectionId })
          .catch(console.log);
      }
    };
  }, [sharingMode, ready, roomId, ioConnectionId]);

  return exportApis;
}

export default useMediasoup;
