import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Checkbox, Modal } from "antd";
import { IconResize } from "main/room/components/icons";

import { actions } from "main/room/store";

import media from "main/room/media";

function CameraSetting() {
  const dispatch = useDispatch();
  const visible = useSelector(({ device }) => device.camSetting.visible);
  const camOptions = useSelector(({ device }) => device.camSetting.options);
  const currentCam = useSelector(({ device }) => device.camSetting.current);

  useEffect(() => {
    if (camOptions.length > 0) {
      dispatch(actions.setCamSetting(camOptions[0].id));
    }
  }, [camOptions, dispatch]);

  function changeCamSetting(selected) {
    if (selected.length > 0) {
      dispatch(actions.setCamSetting(selected[0]));
    }
  }

  function submitChange() {
    dispatch(actions.setCam(currentCam));
    hide();
  }

  function hide() {
    dispatch(actions.hideCamSetting());
  }

  const props = {
    visible,
    className: "popup-camera",
    title: "Cấu hình thiết bị hình ảnh",
    closable: false,
    onCancel() {
      dispatch(actions.hideCamSetting());
    },
    footer: [
      <button key="ok" className="btn-apply" onClick={submitChange}>
        Áp dụng
      </button>,
      <button key="cancel" className="btn-cancle" onClick={hide}>
        Hủy
      </button>,
    ],
  };

  return (
    <Modal {...props}>
      <div className="setting-top">
        <div className="setting-volume">
          <Checkbox.Group
            value={currentCam}
            className="setting-radio"
            onChange={changeCamSetting}
            options={camOptions.map((o) => ({ value: o.id, label: o.label }))}
          />
        </div>
      </div>
      <div className="setting-bottom">
        <div className="setting-title">
          <IconResize />
          <span>Preview</span>
        </div>
        <CamPreview />
      </div>
    </Modal>
  );
}

function CamPreview() {
  const visible = useSelector(({ device }) => device.camSetting.visible);
  const deviceId = useSelector(({ device }) => device.camSetting.current);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    let s;

    media
      .getCamStream({ deviceId, width: 1280, height: 720 })
      .then((st) => {
        s = st;
        setStream(st);
      })
      .catch(console.log);

    return () => {
      if (s) {
        s.getTracks().forEach((t) => t.stop());
      }
    };
  }, [deviceId, visible]);

  if (stream) {
    return <CamPreviewWithStream stream={stream} />;
  }

  return null;
}

function CamPreviewWithStream({ stream }) {
  const video = useRef();

  useEffect(() => {
    video.current.srcObject = stream;
  }, [stream]);

  return (
    <div className="setting-bg">
      <video id="cam-video" ref={video} autoPlay playsInline />
    </div>
  );
}

export default CameraSetting;
