import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd-mobile";
import { actions } from "main/room-mobile/store";
import api from "api";

function JoinButton() {
  const dispatch = useDispatch();
  const roomId = useSelector(({ room }) => room.id);
  const name = useSelector(({ room }) => room.name);
  const password = useSelector(({ room }) => room.password);
  const ioConnectionId = useSelector(({ room }) => room.socketio.connectionId);
  const displayName = useSelector(({ user }) => user.displayName);
  const email = useSelector(({ user }) => user.email);
  const avatarUrl = useSelector(({ user }) => user.avatarUrl);
  const isModerator = useSelector(({ user }) => user.isModerator);

  const [loading, setLoading] = useState(false);

  async function join() {
    try {
      setLoading(true);

      const { createdAt } = await api.createRoomIfNotExist({
        roomId,
        name,
        password,
      });

      await api.requestJoin({
        roomId,
        ioConnectionId,
        displayName,
        email,
        avatarUrl,
        isModerator,
      });

      dispatch(actions.setRoomCreatedAt(createdAt));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    dispatch(actions.setJoined());
  }

  return (
    <Button color="primary" onClick={join} loading={loading}>
      Tham gia cuộc họp
    </Button>
  );
}

export default JoinButton;
