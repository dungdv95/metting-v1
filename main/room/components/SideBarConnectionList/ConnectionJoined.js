import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popover, Avatar, Tooltip } from "antd";
import {
  FaChromecast,
  FaMicrophone,
  FaVideo,
  FaEllipsisV,
  FaMicrophoneSlash,
  FaVideoSlash,
} from "react-icons/fa";
import { useDebounceCallback } from "main/room/hooks";
import { removeVietnameseTones } from "main/room/utils";
import message from "main/room/components/message";
import { actions } from "main/room/store";
import apis from "api";

function ConnectionJoined() {
  const dispatch = useDispatch();

  const connections = useSelector((state) => state.connections);
  const searchNameContent = useSelector(({ search }) => search.checkName);
  const searchTypeContent = useSelector(({ search }) => search.checkType);
  const sharingConnectionId = useSelector(
    ({ screensharing }) => screensharing.ownerId
  );
  const modeSharing = useSelector(({ screensharing }) => screensharing.mode);
  const localId = useSelector(({ room }) => room.socketio.connectionId);

  const [dataFilter, setDataFilter] = useState(connections);

  useEffect(() => {
    debouncedHandleFilter(searchNameContent, searchTypeContent);
  }, [
    connections,
    debouncedHandleFilter,
    searchNameContent,
    searchTypeContent,
    sharingConnectionId,
    modeSharing,
  ]);

  const debouncedHandleFilter = useDebounceCallback(
    (searchNameContent, searchTypeContent) => {
      let tmpConnection = connections.slice();
      let tmpDataFilter = tmpConnection.filter((connection) => {
        let checkName = searchNameContent
          ? removeVietnameseTones(connection.displayName)
              .toUpperCase()
              .indexOf(
                removeVietnameseTones(searchNameContent).toUpperCase()
              ) != -1 ||
            connection.displayName
              .toUpperCase()
              .indexOf(searchNameContent.toUpperCase()) != -1
          : true;
        let checkType = true;

        switch (searchTypeContent) {
          case "all":
            break;
          case "cam-on":
            checkType = connection.camEnable;
            break;
          case "cam-off":
            checkType = !connection.camEnable;
            break;
          case "mic-on":
            checkType = connection.micEnable;
            break;
          case "mic-off":
            checkType = !connection.micEnable;
            break;
          case "share":
            if (modeSharing == "local") {
              checkType = connection.id == localId;
            } else if (modeSharing == "remote") {
              checkType = connection.id == sharingConnectionId;
            } else {
              checkType = false;
            }
            break;
          default:
            break;
        }
        return checkName && checkType;
      });
      dispatch(actions.updateLengthFilter(tmpDataFilter.length));
      setDataFilter(tmpDataFilter);
    },
    250
  );

  return (
    <div className={`meeting-sidebar-content active`}>
      <div className="meeting-sidebar-join">
        {dataFilter?.map((c) => (
          <Connection key={c.id} {...c} />
        ))}
      </div>
    </div>
  );
}

function Connection({ id, displayName, email, camEnable, micEnable, pined }) {
  const isModerator = useSelector(({ user }) => user.isModerator);
  const sharingConnectionId = useSelector(
    ({ screensharing }) => screensharing.ownerId
  );
  const modeShare = useSelector(({ screensharing }) => screensharing.mode);
  const ioConnectionId = useSelector(({ room }) => room.socketio.connectionId);

  const sharing =
    (modeShare === "local" && id == ioConnectionId) ||
    sharingConnectionId === id;
  const countEnable = sharing ? 25 : 30;
  return (
    <div className="meeting-join-item">
      <div className="join-item-left flex-auto">
        <div className="join-item-avatar">
          <Avatar className="avatar">
            {displayName.charAt(0).toUpperCase()}
          </Avatar>
        </div>
        <div className={sharing ? "join-item-desc-share" : "join-item-desc"}>
          {displayName.length > 30 ? (
            <Tooltip placement="topLeft" title={displayName}>
              <h5 className="mb-0">
                {displayName.slice(0, countEnable) + "..."}
              </h5>
            </Tooltip>
          ) : (
            <h5 className="mb-0">{displayName}</h5>
          )}
          <p className="mb-0">{email}</p>
        </div>
      </div>
      {/* <div className="join-item-right"> */}
      {sharing && (
        <div className="w-5">
          <FaChromecast color="white" className="mx-1" />
        </div>
      )}
      <div className="w-5">
        {micEnable ? (
          <FaMicrophone color="white" className="mx-1" />
        ) : (
          <FaMicrophoneSlash className="mx-1 text-slate-300" />
        )}
      </div>
      <div className="w-5">
        {camEnable ? (
          <FaVideo color="white" className="mx-1" />
        ) : (
          <FaVideoSlash className="mx-1 text-slate-300" />
        )}
      </div>
      <div className="w-5">
        {isModerator && (
          <ConnectionActions
            id={id}
            displayName={displayName}
            camEnable={camEnable}
            micEnable={micEnable}
            sharing={sharing}
            pined={pined}
            email={email}
          />
        )}
      </div>
      {/* </div> */}
    </div>
  );
}

function DisplayNameConnectTion({}) {}
function ConnectionActions({
  id,
  camEnable,
  micEnable,
  sharing,
  pined,
  displayName,
  email,
}) {
  const dispatch = useDispatch();
  const layout = useSelector(({ layout }) => layout.current);
  const roomId = useSelector(({ room }) => room.id);
  const ioConnectionId = useSelector(({ room }) => room.socketio.connectionId);
  const spotlightConnectionId = useSelector((state) => state.spotlight.ownerId);
  const [visible, setVisible] = useState(false);

  async function pinConnection() {
    try {
      await apis.pinConnection({ ioConnectionId: id, roomId });
      await apis.setSpotlight({ ioConnectionId: id, roomId });
      setVisible(false);
    } catch (error) {
      console.log(error);
      message.warning("Không thể pin thêm điểm cầu");
    }
  }

  function unpinConnection() {
    apis.unpinConnection({ ioConnectionId: id, roomId }).catch(console.log);
    if (id === spotlightConnectionId) {
      apis.unsetSpotlight({ roomId }).catch(console.log);
    }
    setVisible(false);
  }

  function forceTurnOffMic() {
    apis.forceConnectionTurnOffMic({ ioConnectionId: id }).catch(console.log);
    setVisible(false);
  }

  function forceTurnOffCam() {
    apis.forceConnectionTurnOffCam({ ioConnectionId: id }).catch(console.log);
    setVisible(false);
  }

  function forceLeaveRoom() {
    apis
      .forceConnectionLeaveRoom({ ioConnectionId: id, roomId, email })
      .catch(console.log);
    setVisible(false);
  }

  function forceStopShare() {
    apis.forceConnectionStopShare({ ioConnectionId: id }).catch(console.log);
    setVisible(false);
  }
  function forceChangeName() {
    dispatch(
      actions.showSettingDisplayName({
        ioConnectionId: id,
        displayName: displayName,
      })
    );
    setVisible(false);
  }

  function onVisibleChange(visible) {
    setVisible(visible);
  }

  function canPinConnection() {
    return !pined && layout === "webinar";
  }

  function canUnpinConnection() {
    return pined && layout === "webinar";
  }

  function canForceTurnOffCam() {
    return notCurrentConnection() && camEnable;
  }

  function canForceTurnOffMic() {
    return notCurrentConnection() && micEnable;
  }

  function canForceStopShare() {
    return notCurrentConnection() && sharing;
  }

  function canForceLeaveRoom() {
    return notCurrentConnection();
  }

  function canChangeName() {
    return notCurrentConnection();
  }

  function notCurrentConnection() {
    return id !== ioConnectionId;
  }

  function haveAnyPermissions() {
    return (
      canForceTurnOffCam() ||
      canForceTurnOffMic() ||
      canForceStopShare() ||
      canForceLeaveRoom() ||
      canPinConnection() ||
      canUnpinConnection() ||
      canChangeName()
    );
  }

  function renderContent() {
    return (
      <div className="content-more">
        <div className="content-more-top">
          {canPinConnection() && (
            <div className="content-more-item" onClick={pinConnection}>
              <span>Pin điểm cầu này</span>
            </div>
          )}
          {canUnpinConnection() && (
            <div className="content-more-item" onClick={unpinConnection}>
              <span>Gỡ Pin điểm cầu này</span>
            </div>
          )}
          {canForceTurnOffCam() && (
            <div className="content-more-item" onClick={forceTurnOffCam}>
              <span>Tắt cam</span>
            </div>
          )}
          {canForceTurnOffMic() && (
            <div className="content-more-item" onClick={forceTurnOffMic}>
              <span>Tắt mic</span>
            </div>
          )}
          {canForceStopShare() && (
            <div className="content-more-item" onClick={forceStopShare}>
              <span>Tắt chia sẻ màn hình</span>
            </div>
          )}
          {canChangeName() && (
            <div className="content-more-item" onClick={forceChangeName}>
              <span>Thay đổi tên</span>
            </div>
          )}
        </div>
        {canForceLeaveRoom() && (
          <div className="content-more-bottom">
            <div className="content-more-item" onClick={forceLeaveRoom}>
              <span>Mời ra khỏi phòng</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (haveAnyPermissions()) {
    return (
      <Popover
        overlayClassName="custom-popover-setting-more"
        content={renderContent}
        placement="bottomRight"
        onVisibleChange={onVisibleChange}
        visible={visible}
      >
        <FaEllipsisV color="white" size={15} />
      </Popover>
    );
  }

  return null;
}
export default ConnectionJoined;
