import { Tooltip } from "antd";
import { AiOutlineDesktop } from "react-icons/ai";
import { FiGrid } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "main/room/store";
import { FaInfoCircle } from "react-icons/fa";
import dynamic from "next/dynamic";
import { toHHMMSS } from "main/room/utils";
import { useState } from "react";
import { useInterval } from "../hooks";
import { EditOutlined } from "@ant-design/icons";

const RoomInfor = dynamic(() => import("main/room/components/RoomInfor"), {
  ssr: false,
});

function RoomInsideHeader() {
  const dispatch = useDispatch();
  const roomName = useSelector(({ room }) => room.name);
  const roomId = useSelector(({ room }) => room.id);
  const displayName = useSelector(({ user }) => user.displayName);
  const ioConnectionId = useSelector(({ room }) => room.socketio.connectionId);

  function setVisible() {
    dispatch(
      actions.showSettingDisplayName({
        ioConnectionId: ioConnectionId,
        displayName: displayName,
      })
    );
  }
  return (
    <div className="header-meet">
      <div className="header-meet-container">
        <div className="header-meet-inner">
          <div className="header-meet-left ">
            <div className="header-left-desc">
              <h3 className="mb-0">
                <RoomName roomName={roomName} />
                <Tooltip placement="right" title="Thông tin phòng họp">
                  <FaInfoCircle
                    onClick={() => {
                      dispatch(actions.setRoomInfoPopupVisible(true));
                    }}
                    className="infor-room"
                  />
                </Tooltip>
              </h3>
              <div className="header-box-id">
                <h5 className="header-id mb-0">ID: {roomId}</h5>
                <span className="icon-span" />
                <RoomLifespan />
                <span className="icon-span" />
                {displayName.length > 30 ? (
                  <h5 className="header-time-live mb-0">
                    {displayName.slice(0, 30) + "..."}
                    <Tooltip placement="topLeft" title="Đổi tên">
                      <EditOutlined
                        className="icon-eidt"
                        onClick={setVisible}
                      />
                    </Tooltip>
                  </h5>
                ) : (
                  <h5 className="header-time-live mb-0">
                    {displayName}
                    <Tooltip placement="topLeft" title="Đổi tên">
                      <EditOutlined
                        className="icon-eidt"
                        onClick={setVisible}
                      />
                    </Tooltip>
                  </h5>
                )}
              </div>
            </div>
          </div>
          <LaytouOptions />
        </div>
      </div>
      <RoomInfor />
    </div>
  );
}

function RoomLifespan() {
  const createdAt = useSelector(({ room }) => new Date(room.createdAt));
  const diff = Math.floor(Math.abs((new Date() - createdAt) / 1000));
  const [elapsed, setElapsed] = useState(diff);

  useInterval(() => {
    const diff = Math.floor(Math.abs((new Date() - createdAt) / 1000));
    setElapsed(diff);
  }, 1000);

  return (
    <Tooltip placement="top" title="Thời gian cuộc họp">
      <div className="header-time-live">{toHHMMSS(elapsed)}</div>
    </Tooltip>
  );
}

function RoomName({ roomName }) {
  if (roomName.length > 40) {
    return (
      <Tooltip placement="topLeft" title={roomName}>
        <span>{roomName.slice(0, 40) + "..."}</span>
      </Tooltip>
    );
  }

  return <span>{roomName}</span>;
}

function LaytouOptions() {
  const dispatch = useDispatch();
  const layout = useSelector(({ layout }) => layout.current);

  function changeModeSidebar() {
    dispatch(actions.setLayoutSidebar());
  }

  function changeModeGrid() {
    dispatch(actions.setLayoutGrid());
  }

  if (layout === "sidebar") {
    return (
      <div className="header-meet-right">
        <div onClick={changeModeGrid}>
          <div className="header-view cursor-pointer active">
            <Tooltip title="Hiển thị dạng lưới">
              <FiGrid size={20} />
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }

  if (layout === "grid") {
    return (
      <div className="header-meet-right">
        <div onClick={changeModeSidebar}>
          <div className="header-view active">
            <Tooltip title="Hiển thị dạng SpeakerView" placement="left">
              <AiOutlineDesktop size={20} />
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default RoomInsideHeader;
