import { useEffect } from "react";
import { useSelector } from "react-redux";

import apis from "api";

function useSyncRemoteviews() {
  const roomId = useSelector(({ room }) => room.id);
  const ioConnectionId = useSelector(({ room }) => room.socketio.connectionId);
  const page = useSelector(({ remoteview }) => remoteview.page);
  const pageSize = useSelector(({ remoteview }) => remoteview.pageSize);

  useEffect(() => {
    apis
      .requestPageChange({ roomId, ioConnectionId, page, pageSize })
      .catch(console.log);
  }, [roomId, ioConnectionId, page, pageSize]);
}

export default useSyncRemoteviews;
