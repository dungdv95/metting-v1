import { Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  FaVideo,
  FaVideoSlash,
  FaAngleUp,
  FaTimesCircle,
} from "react-icons/fa";
import { actions, selectors } from "main/room/store";

function CamButton() {
  const dispatch = useDispatch();
  const camEnable = useSelector(({ device }) => device.cam.enable);
  const canShareCam = useSelector(({ perms }) => perms.canShareCam);
  const hasCamPerm = useSelector(({ device }) => device.cam.hasPerm);
  const camAvailiable = useSelector(selectors.camAvailiable);

  const btnDisable = !canShareCam || !hasCamPerm || !camAvailiable;

  function toggleCam() {
    dispatch(actions.toggleCamEnable());
  }
  function showSetting() {
    dispatch(actions.showCamSetting());
  }

  function reasonBtnDiabled() {
    if (!camAvailiable) {
      return "Không có thiết bị hỗ trợ";
    }

    if (!canShareCam) {
      return "Bạn không có quyền chia sẻ cam";
    }

    if (!hasCamPerm) {
      return "Trình duyệt của bạn chưa được cấp quyền sử dụng cam";
    }

    return "Lý do không xác định";
  }

  if (btnDisable) {
    return (
      <Tooltip placement="top" title={reasonBtnDiabled()}>
        <div className="btn-grid btn-meet-disable">
          <FaVideo size={20} color="gray" />
          <FaTimesCircle color="gray" size={16} />
        </div>
      </Tooltip>
    );
  }

  return (
    <div className="btn-grid">
      <Tooltip placement="top" title={camEnable ? "Tắt cam" : "Bật cam"}>
        <div className="cursor-pointer" onClick={toggleCam}>
          {camEnable ? (
            <FaVideo size={20} color="green" />
          ) : (
            <FaVideoSlash size={20} color="gray" />
          )}
        </div>
      </Tooltip>
      <Tooltip placement="top" title="Thiết lập Camera">
        <i className="cursor-pointer" onClick={showSetting}>
          <FaAngleUp color="gray" size={16} />
        </i>
      </Tooltip>
    </div>
  );
}

export default CamButton;
