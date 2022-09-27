import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "antd";
import { IconBackground } from "main/room/components/icons";
import { FaAngleUp, FaTimesCircle } from "react-icons/fa";
import { actions, selectors } from "main/room/store";

function BgStatus() {
  const dispatch = useDispatch();
  const bg = useSelector(({ device }) => device.cam.bg.current);
  const camAvailiable = useSelector(selectors.camAvailiable);
  const hasCamPerm = useSelector(({ device }) => device.cam.hasPerm);
  const canShareCam = useSelector(({ perms }) => perms.canShareCam);
  const canUseBgFeature = hasCamPerm && canShareCam;

  function showBg() {
    if (canUseBgFeature) {
      dispatch(actions.showBgSetting());
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

    return "Thiết lập Background";
  }

  return (
    <Tooltip title={title()}>
      <div
        className={`btn-meet-camera mr-4 ${
          !canUseBgFeature && "btn-meet-disable"
        }`}
        onClick={showBg}
      >
        <div>
          {bg === "off" ? (
            <IconBackground className="opacity-50" />
          ) : (
            <IconBackground />
          )}
        </div>

        <div className="meet-setting">
          <div className="meet-text">
            <h5 className="mb-0">Hình nền</h5>
            {bg === "off" ? (
              <p className="mb-0 off">Tắt</p>
            ) : (
              <p className="mb-0 on">Mở</p>
            )}
          </div>
          {canUseBgFeature ? (
            <FaAngleUp color="gray" size={16} />
          ) : (
            <FaTimesCircle color="gray" size={16} />
          )}
        </div>
      </div>
    </Tooltip>
  );
}

export default BgStatus;
