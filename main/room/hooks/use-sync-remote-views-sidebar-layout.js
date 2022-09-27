import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import apis from "api";
import { actions } from "main/room/store";

function useSyncRemoteViewsLayoutSideBar() {
  const dispatch = useDispatch();
  const roomId = useSelector(({ room }) => room.id);
  const ioConnectionId = useSelector(({ room }) => room.socketio.connectionId);
  const { page, pageSize } = useSelector(({ layout }) => layout.sidebar);

  useEffect(() => {
    dispatch(actions.setLayoutSidebarPageLoading(true));
    apis
      .requestPageChange({ roomId, ioConnectionId, page, pageSize })
      .catch(console.log)
      .finally(() => {
        dispatch(actions.setLayoutSidebarPageLoading(false));
      });
  }, [roomId, ioConnectionId, page, pageSize, dispatch]);
}

export default useSyncRemoteViewsLayoutSideBar;
