import { useDispatch, useSelector } from "react-redux";
import { Popover } from "antd";
import { FaCog, FaImage, FaEdit } from "react-icons/fa";
import { actions } from "main/room/store";
import { useState } from "react";

function SettingButton() {
  const isModerator = useSelector(({ user }) => user.isModerator);
  const [popoverVisible, setPopoverVisible] = useState(false);

  function onVisibleChange(visible) {
    setPopoverVisible(visible);
  }

  function hidePopover() {
    setPopoverVisible(false);
  }

  const moreMenu = (
    <div className="list-setting">
      <BackGround hidePopover={hidePopover} />
      <ChangeName hidePopover={hidePopover} />
      {isModerator && <Policy hidePopover={hidePopover} />}
    </div>
  );

  return (
    <Popover
      overlayClassName="custom-popover-setting"
      placement="topRight"
      content={moreMenu}
      visible={popoverVisible}
      onVisibleChange={onVisibleChange}
    >
      <div className="btn-setting cursor-pointer">
        <FaCog color="white" size={20} />
      </div>
    </Popover>
  );
}

function BackGround({ hidePopover }) {
  const dispatch = useDispatch();

  function onClick() {
    hidePopover();
    dispatch(actions.showBgSetting());
  }

  return (
    <div className="setting-item" onClick={onClick}>
      <FaImage color="#959595" />
      <span>Chọn hình nền</span>
    </div>
  );
}

function ChangeName({ hidePopover }) {
  const dispatch = useDispatch();
  const displayName = useSelector(({ user }) => user.displayName);
  const ioConnectionId = useSelector(({ room }) => room.socketio.connectionId);

  function onClick() {
    hidePopover();
    dispatch(actions.showSettingDisplayName({ ioConnectionId, displayName }));
  }

  return (
    <div className="setting-item" onClick={onClick}>
      <FaEdit color="#959595" />
      <span>Thay đổi tên</span>
    </div>
  );
}

function Policy({ hidePopover }) {
  const dispatch = useDispatch();

  function onClick() {
    hidePopover();
    dispatch(actions.showSettingPolicy());
  }

  return (
    <div className="setting-item" onClick={onClick}>
      <FaCog color="#959595" />
      <span>Cấu hình phòng họp</span>
    </div>
  );
}

export default SettingButton;
