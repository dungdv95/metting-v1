import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { actions } from "main/room/store";
import message from "main/room/components/message";
import media from "main/room/media";

function useSyncDevices() {
  const dispatch = useDispatch();
  const camDevices = useSelector(({ device }) => device.camSetting.options);
  const micDevices = useSelector(({ device }) => device.micSetting.options);
  const currentCam = useSelector(({ device }) => device.cam.current);
  const currentMic = useSelector(({ device }) => device.mic.current);

  useEffect(() => {
    async function syncDevices() {
      const devices = await media.getDevices();
      const micDevices = [];
      const camDevices = [];
      const speakerDevices = [];

      for (const device of devices) {
        if (device.kind === "audioinput") {
          micDevices.push({ label: device.label, id: device.deviceId });
          continue;
        }

        if (device.kind === "videoinput") {
          camDevices.push({ label: device.label, id: device.deviceId });
          continue;
        }

        if (device.kind === "audiooutput") {
          speakerDevices.push({ label: device.label, id: device.deviceId });
          continue;
        }
      }

      dispatch(actions.setMicOptions(micDevices));
      dispatch(actions.setCamOptions(camDevices));
      dispatch(actions.setSpeakerOptions(speakerDevices));
    }

    function notifyDeviceChanged() {
      message.warning("Phát hiện thiết bị thay đổi");
    }

    navigator.mediaDevices.addEventListener("devicechange", syncDevices);
    navigator.mediaDevices.addEventListener(
      "devicechange",
      notifyDeviceChanged
    );

    syncDevices().catch(console.log);

    return () => {
      navigator.mediaDevices.removeEventListener("devicechange", syncDevices);
      navigator.mediaDevices.removeEventListener(
        "devicechange",
        notifyDeviceChanged
      );
    };
  }, [dispatch]);

  useEffect(() => {
    if (camDevices.length > 0) {
      dispatch(actions.setCam(camDevices[0].id));
      dispatch(actions.setCamSetting(camDevices[0].id));
    }
  }, [camDevices, dispatch]);

  useEffect(() => {
    if (micDevices.length > 0) {
      dispatch(actions.setMic(micDevices[0].id));
      dispatch(actions.setMicSetting(micDevices[0].id));
    }
  }, [micDevices, dispatch]);

  useEffect(() => {
    if (currentCam) {
      const found = camDevices.find((device) => device.id === currentCam);

      if (found) {
        return;
      }

      message.warning("Thiết bị hình ảnh đang dùng đã bị gỡ bỏ");
      dispatch(actions.setCamEnable(false));
    }
  }, [camDevices, currentCam, dispatch]);

  useEffect(() => {
    if (currentMic) {
      const found = micDevices.find((device) => device.id === currentMic);

      if (found) {
        return;
      }

      message.warning("Thiết bị thu ấm thanh đang dùng đã bị gỡ bỏ");
      dispatch(actions.setMicEnable(false));
    }
  }, [micDevices, currentMic, dispatch]);
}

export default useSyncDevices;
