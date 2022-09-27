import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "antd";

import { FaAngleUp, FaTimesCircle } from "react-icons/fa";
import { BsCameraVideoOff, BsCameraVideo } from "react-icons/bs";

import { actions, selectors } from "main/room/store";

function VideoStatus() {
  const dispatch = useDispatch();
  const camEnable = useSelector(({ device }) => device.cam.enable);
  const hasCamPerm = useSelector(({ device }) => device.cam.hasPerm);
  const canShareCam = useSelector(({ perms }) => perms.canShareCam);
  const camAvailiable = useSelector(selectors.camAvailiable);
  const canUseCamFeature = hasCamPerm && canShareCam && camAvailiable;

  function toggleCam() {
    if (canUseCamFeature) {
      dispatch(actions.toggleCamEnable());
    }
  }

  function showSetting() {
    if (canUseCamFeature) {
      dispatch(actions.showCamSetting());
    }
  }

  function title() {
    if (!camAvailiable) {
      return "Không có thiết bị hỗ trợ";
    }

    if (!canShareCam) {
      return "Không có quyền!";
    }

    if (!hasCamPerm) {
      return "Trình duyệt của bạn chưa được cấp quyền sử dụng cam";
    }

    return "Thiết lập Camera";
  }

  return (
    <Tooltip placement="top" title={title()}>
      <div
        className={`btn-meet-camera mr-4 ${
          !canUseCamFeature && "btn-meet-disable"
        }`}
      >
        <div onClick={toggleCam}>
          {camEnable ? (
            <BsCameraVideo color="green" size={20} />
          ) : (
            <BsCameraVideoOff color="gray" size={20} />
          )}
        </div>

        <div className="meet-setting" onClick={showSetting}>
          <div className="meet-text">
            <h5 className="mb-0">Camera</h5>
            {camEnable ? (
              <p className="mb-0 on">Mở</p>
            ) : (
              <p className="mb-0 off">Tắt</p>
            )}
          </div>

          {canUseCamFeature ? (
            <FaAngleUp color="gray" size={16} />
          ) : (
            <FaTimesCircle color="gray" size={16} />
          )}
        </div>
      </div>
    </Tooltip>
  );
}

export default VideoStatus;
