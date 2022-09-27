import { useEffect } from "react";
import { useSelector } from "react-redux";

import apis from "api";

function useSyncRemoteViewsGridLayout() {
  const roomId = useSelector(({ room }) => room.id);
  const ioConnectionId = useSelector(({ room }) => room.socketio.connectionId);
  const { page, pageSize } = useSelector(({ layout }) => layout.grid);

  useEffect(() => {
    apis
      .requestPageChange({ roomId, ioConnectionId, page, pageSize })
      .catch(console.log);
  }, [roomId, ioConnectionId, page, pageSize]);
}

export default useSyncRemoteViewsGridLayout;
