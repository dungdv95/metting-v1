import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "main/room/store";

function PermissionsWarning() {
  const dispatch = useDispatch();
  const hasMicPerm = useSelector(({ device }) => device.mic.hasPerm);
  const hasCamPerm = useSelector(({ device }) => device.cam.hasPerm);
  const camDevices = useSelector(({ device }) => device.camSetting.options);
  const micDevices = useSelector(({ device }) => device.micSetting.options);
  const checkCamNotPer = !hasCamPerm && camDevices.length > 0;
  const checkMicNotPer = !hasMicPerm && micDevices.length > 0;
  function showTutorial() {
    dispatch(
      actions.setVisibleTutorial({
        mode: "device",
        visible: true,
      })
    );
  }

  if (checkCamNotPer || checkMicNotPer) {
    return (
      <div className="meet-notifi">
        <div className="meet-noti-content meet-noti-reload">
          Bạn chưa cấp quyền truy cập {checkMicNotPer && <span>mic</span>}{" "}
          {checkCamNotPer && <span>cam</span>}{" "}
          <span className="btn" onClick={showTutorial}>
            Xem hướng dẫn
          </span>
        </div>
      </div>
    );
  }
}

export default PermissionsWarning;
