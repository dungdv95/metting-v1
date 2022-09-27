import { useEffect } from "react";
import { useSelector } from "react-redux";

import apis from "api";

function useRequestUpdateScreenShareConsumer() {
  const roomId = useSelector(({ room }) => room.id);
  const ioConnectionId = useSelector(({ room }) => room.socketio.connectionId);

  useEffect(() => {
    apis
      .requestUpdateScreenShareConsumer({ roomId, ioConnectionId })
      .catch(console.log);
  }, [roomId, ioConnectionId]);
}

export default useRequestUpdateScreenShareConsumer;
