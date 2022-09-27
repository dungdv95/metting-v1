import { useSelector } from "react-redux";
import { Tooltip } from "antd";
import { BsPerson } from "react-icons/bs";

function RoomInfo() {
  const roomName = useSelector(({ room }) => room.name);

  return (
    <div className="meet-head-left">
      <Tooltip placement="topLeft" title={roomName}>
        {roomName.length > 60 ? (
          <h3 className="mb-1">{roomName.slice(0, 60) + "..."}</h3>
        ) : (
          <h3 className="mb-1">{roomName}</h3>
        )}
      </Tooltip>
      <HearderMeeting />
    </div>
  );
}

function HearderMeeting() {
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
  const roomId = useSelector(({ room }) => room.id);
  const displayName = useSelector(({ user }) => user.displayName);

  return (
    <div className="meet-head-info">
      <span className="meet-head-id">ID: {roomId}</span>
      <span className="meet-head-border"> </span>
      <span className="text-white mr-0.5	">
        <BsPerson size={15} />
      </span>
      {displayName.length > 45 ? (
        <Tooltip placement="top" title={displayName}>
          <p className="mb-0 meet-head-user">{displayName}</p>
        </Tooltip>
      ) : (
        <p className="mb-0 meet-head-user">{displayName}</p>
      )}
    </div>
  );
}

function Waiting() {
  return (
    <div className="mb-0 meet-header-pending">
      <div className="lds-spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      <span>Vui lòng chờ quản trị viên.</span>
    </div>
  );
}

function Rejected() {
  return (
    <div className="meet-head-info">
      <span className="text-red-500">
        Yêu cầu tham gia phòng họp bị từ chối!
      </span>
    </div>
  );
}

export default RoomInfo;
