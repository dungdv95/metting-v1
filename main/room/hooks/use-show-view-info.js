import { useSelector, useDispatch } from "react-redux";
import { actions } from "main/room/store";

function useShowViewInfo({ displayName, consumerId, resolution = {} } = {}) {
  const dispatch = useDispatch();
  const roomId = useSelector(({ room }) => room.id);
  const connId = useSelector(({ room }) => room.socketio.connectionId);

  const width = resolution.width || (() => undefined);
  const height = resolution.height || (() => undefined);

  function showViewInfo() {
    dispatch(
      actions.showViewInfo({
        roomId,
        connId,
        consumerId,
        displayName,
        resolution: { width: width(), height: height() },
      })
    );
  }

  return showViewInfo;
}

export default useShowViewInfo;
