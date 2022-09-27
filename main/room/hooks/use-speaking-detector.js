import { useEffect } from "react";
import { useSelector } from "react-redux";

import hark from "hark";
import media from "main/room/media";

import apis from "api";

function useSpeakingDetector() {
  const roomId = useSelector(({ room }) => room.id);
  const ioConnectionId = useSelector(({ room }) => room.socketio.connectionId);
  const micEnable = useSelector(({ device }) => device.mic.enable);
  const current = useSelector(({ device }) => device.mic.current);

  useEffect(() => {
    if (micEnable) {
      let speechEvents;
      let stream;

      async function run() {
        stream = await media.getMicStream(current);
        speechEvents = hark(stream);

        speechEvents.on("speaking", () => {
          apis
            .setSpeakingStatusThenSetSpotlight({
              roomId,
              ioConnectionId,
              speaking: true,
            })
            .catch(console.log);
        });

        speechEvents.on("stopped_speaking", () => {
          apis
            .setSpeakingStatusThenSetSpotlight({
              roomId,
              ioConnectionId,
              speaking: false,
            })
            .catch(console.log);
        });
      }

      run().catch(console.log);

      return () => {
        speechEvents?.stop();
      };
    }
  }, [micEnable, roomId, ioConnectionId, current]);
}

export default useSpeakingDetector;
