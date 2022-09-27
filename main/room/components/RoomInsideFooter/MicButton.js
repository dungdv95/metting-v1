import { Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaAngleUp,
  FaTimesCircle,
} from "react-icons/fa";
import { actions, selectors } from "main/room/store";

function MicButton() {
  const dispatch = useDispatch();
  const canShareAudio = useSelector(({ perms }) => perms.canShareAudio);
  const hasMicPerm = useSelector(({ device }) => device.mic.hasPerm);
  const micEnable = useSelector(({ device }) => device.mic.enable);
  const micAvailiable = useSelector(selectors.micAvailiable);

  const btnDisable = !canShareAudio || !hasMicPerm || !micAvailiable;


  function toggleMic() {
    dispatch(actions.toggleMicEnable());
  }

  function showSetting() {
    dispatch(actions.showMicSetting());
  }

  function reasonBtnDiabled() {
    if (!micAvailiable) {
      return "Không có thiết bị hỗ trợ";
    }

    if (!canShareAudio) {
      return "Bạn không có quyền chia sẻ mic";
    }

    if (!hasMicPerm) {
      return "Trình duyệt của bạn chưa được cấp quyền sử dụng mic";
    }

    return "Lý do không xác định";
  }

  if (btnDisable) {
    return (
      <Tooltip placement="top" title={reasonBtnDiabled()}>
        <div className="btn-grid btn-meet-disable">
          <FaMicrophoneSlash size={20} color="gray" />
          <FaTimesCircle color="gray" size={16} />
        </div>
      </Tooltip>
    );
  }

  return (
    <div className="btn-grid">
      <Tooltip title={micEnable ? "Tắt mic" : "Bật mic"}>
        <div className="cursor-pointer" onClick={toggleMic}>
          {micEnable ? (
            <FaMicrophone size={20} color="green" />
          ) : (
            <FaMicrophoneSlash size={20} color="gray" />
          )}
        </div>
      </Tooltip>
      <Tooltip title="Thiết lập mic">
        <i className="cursor-pointer" onClick={showSetting}>
          <FaAngleUp color="gray" size={16} />
        </i>
      </Tooltip>
    </div>
  );
}

export default MicButton;
