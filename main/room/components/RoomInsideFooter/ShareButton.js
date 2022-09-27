import { Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineStopScreenShare, MdOutlineScreenShare } from "react-icons/md";
import { actions } from "main/room/store";

function ShareButton() {
  const dispatch = useDispatch();
  const sharingMode = useSelector(({ screensharing }) => screensharing.mode);
  const canShareScreen = useSelector(({ perms }) => perms.canShareScreen);

  function startShare() {
    dispatch(actions.setScreenSharingModeRequesting());
  }

  function stopShare() {
    dispatch(actions.setScreenSharingModeOff());
  }

  if (!canShareScreen) {
    return (
      <Tooltip placement="top" title="Bạn không có quyền chia sẻ màn hình">
        <div className="btn-rss-last btn-meet-disable">
          <MdOutlineStopScreenShare size={22} color="gray" />
        </div>
      </Tooltip>
    );
  }

  if (sharingMode === "off" || sharingMode === "requesting") {
    return (
      <Tooltip title="Bắt đầu chia sẻ màn hình">
        <div className="btn-rss-last cursor-pointer" onClick={startShare}>
          <MdOutlineStopScreenShare size={22} color="gray" />
        </div>
      </Tooltip>
    );
  }

  if (sharingMode === "local") {
    return (
      <Tooltip title="Dừng chia sẻ màn hình">
        <div className="btn-rss-last active cursor-pointer" onClick={stopShare}>
          <MdOutlineScreenShare size={22} color="green" />
        </div>
      </Tooltip>
    );
  }

  if (sharingMode === "remote") {
    return (
      <Tooltip title="Đã có người trong phòng đang chia sẻ">
        <div className="btn-rss-last btn-meet-disable">
          <MdOutlineScreenShare size={22} color="gray" />
        </div>
      </Tooltip>
    );
  }

  return null;
}

export default ShareButton;
