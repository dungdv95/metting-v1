import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "antd";
import {
  FaMicrophoneAlt,
  FaMicrophoneAltSlash,
  FaAngleUp,
  FaTimesCircle,
} from "react-icons/fa";

import { actions, selectors } from "main/room/store";

function AudioStatus() {
  const dispatch = useDispatch();
  const micEnable = useSelector(({ device }) => device.mic.enable);
  const micAvailiable = useSelector(selectors.micAvailiable);
  const hasMicPerm = useSelector(({ device }) => device.mic.hasPerm);
  const canShareAudio = useSelector(({ perms }) => perms.canShareAudio);
  const canUseAudioFeature = hasMicPerm && canShareAudio && micAvailiable;

  function toggleMic() {
    if (hasMicPerm && canShareAudio && micAvailiable) {
      dispatch(actions.toggleMicEnable());
    }
  }

  function showSetting() {
    if (hasMicPerm && canShareAudio && micAvailiable) {
      dispatch(actions.showMicSetting());
    }
  }

  function title() {
    if (!micAvailiable) {
      return "Không có thiết bị hỗ trợ";
    }

    if (!canShareAudio) {
      return "Không có quyền!";
    }

    if (!hasMicPerm) {
      return "Trình duyệt của bạn chưa được cấp quyền sử dụng mic";
    }

    return "Thiết lập Audio";
  }

  return (
    <Tooltip placement="top" title={title()}>
      <div
        className={`btn-meet-audio mr-4 ${
          canUseAudioFeature || "btn-meet-disable"
        }`}
      >
        <div onClick={toggleMic}>
          {micEnable ? (
            <FaMicrophoneAlt color="green" size={20} />
          ) : (
            <FaMicrophoneAltSlash color="gray" size={20} />
          )}
        </div>

        <div className="meet-setting" onClick={showSetting}>
          <div className="meet-text">
            <h5 className="mb-0">Audio</h5>
            {micEnable ? (
              <p className="mb-0 on">Mở</p>
            ) : (
              <p className="mb-0 off">Tắt</p>
            )}
          </div>

          {canUseAudioFeature ? (
            <FaAngleUp color="gray" size={16} />
          ) : (
            <FaTimesCircle color="gray" size={16} />
          )}
        </div>
      </div>
    </Tooltip>
  );
}

export default AudioStatus;
