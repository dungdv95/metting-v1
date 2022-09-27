import { useState, useRef } from "react";
import { Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import ButtonLoadingIcon from "main/room/components/ButtonLoadingIcon";
import { IconPhone } from "main/room/components/icons";
import { actions } from "main/room/store";
import apis from "api";

function JoinButton() {
  const status = useSelector(({ requestjoin }) => requestjoin.status);

  if (status === "idle") {
    return <Idle />;
  }

  if (status === "waiting") {
    return <Waiting />;
  }

  if (status === "rejected") {
    return <Rejected />;
  }

  return null;
}

function Idle() {
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

      const { createdAt, requireApproveToJoin } =
        await apis.createRoomIfNotExist({ roomId, name, password });

      await apis.requestJoin({
        roomId,
        ioConnectionId,
        displayName,
        email,
        avatarUrl,
        isModerator,
      });

      const requestJoins = await apis.getRequestJoins({ roomId });
      dispatch(actions.setRequestJoins(requestJoins));

      dispatch(actions.setRoomCreatedAt(createdAt));
      dispatch(
        actions.setSettingPolicyRequireApproveToJoin(requireApproveToJoin)
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (displayName.trim().length == 0) {
    return (
      <Tooltip placement="top" title="Tên người dùng không được để trống">
        <div className="meet-action-join bg-gray-400 disable">
          <IconPhone />
          <span>Tham gia</span>
        </div>
      </Tooltip>
    );
  }

  return (
    <div className="meet-action-join bg-gray-400" onClick={join}>
      {loading ? (
        <span>Đang vào ...</span>
      ) : (
        <>
          <IconPhone />
          <span>Tham gia</span>
        </>
      )}
    </div>
  );
}

function Waiting() {
  return (
    <Tooltip placement="topLeft" title="Đợi quản trị viên phê duyệt">
      <div className="meet-action-join bg-gray-400 disable">
        <ButtonLoadingIcon />
        <span>Tham gia</span>
      </div>
    </Tooltip>
  );
}

function Rejected() {
  return (
    <Tooltip placement="topLeft" title="Không thể tham gia phòng họp">
      <div className="meet-action-join bg-gray-400 disable">
        <IconPhone />
        <span>Tham gia</span>
      </div>
    </Tooltip>
  );
}

export default JoinButton;
