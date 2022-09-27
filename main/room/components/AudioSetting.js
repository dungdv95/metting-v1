import { Checkbox, Modal, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { actions } from "main/room/store";

function AudioSetting() {
  const dispatch = useDispatch();
  const visible = useSelector(({ device }) => device.micSetting.visible);
  const micOptions = useSelector(({ device }) => device.micSetting.options);
  const currentMic = useSelector(({ device }) => device.mic.current);

  function changeMic(id) {
    dispatch(actions.setMic(id));
  }

  const props = {
    visible,
    title: "Cấu hình thiết bị âm thanh",
    className: "popup-audio",
    closable: false,
    onCancel() {
      dispatch(actions.hideMicSetting());
    },
  };

  return (
    <Modal {...props}>
      <div className="setting-top">
        <div className="setting-microphone">
          <i className="far fa-microphone"></i>
          <h5 className="mb-0">Microphones</h5>
        </div>
        {micOptions.map((o) => (
          <div key={o.id} onClick={() => changeMic(o.id)}>
            {o.label.length > 55 ?
              <Tooltip placement="top" title={o.label}>
                <div className="setting-volume">
                  <div className="setting-radio">
                    <Checkbox checked={currentMic === o.id}>
                      <h5 className="mb-0">{o.label}</h5>
                    </Checkbox>
                  </div>
                </div>
              </Tooltip> :
              <div className="setting-volume">
                <div className="setting-radio">
                  <Checkbox checked={currentMic === o.id}>
                    <h5 className="mb-0">{o.label}</h5>
                  </Checkbox>
                </div>
              </div>
            }

          </div>

        ))}
      </div>
    </Modal >
  );
}

export default AudioSetting;
