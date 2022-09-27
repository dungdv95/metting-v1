import { useState } from "react";
import { Modal, Switch, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "main/room/store";
import message from "main/room/components/message";
import apis from "api";

function PolicySetting() {
  const dispatch = useDispatch();
  const roomId = useSelector(({ room }) => room.id);
  const visible = useSelector(({ setting }) => setting.policy.visible);
  const requireApproveToJoin = useSelector(
    ({ setting }) => setting.policy.requireApproveToJoin
  );

  const [loading, setLoading] = useState(false);

  function onOptionChange(checked) {
    dispatch(actions.setSettingPolicyRequireApproveToJoin(checked));
  }

  function hide() {
    dispatch(actions.hideSettingPolicy());
  }

  function apply() {
    setLoading(true);
    apis
      .setPolicyRequireApproveToJoin({
        roomId,
        requireApproveToJoin,
      })
      .catch((error) => {
        console.log(error);
        message.error("Cấu hình phòng họp thất bại");
        dispatch(
          actions.setSettingPolicyRequireApproveToJoin(!requireApproveToJoin)
        );
      })
      .finally(() => {
        setLoading(false);
        dispatch(actions.hideSettingPolicy());
      });
  }

  const props = {
    visible,
    title: "Cấu hình phòng họp",
    closable: false,
    className: "modal-advanced-setting",
    onCancel() {
      hide();
    },
    footer: [
      <Button key="cancel" className="btn-end" onClick={hide}>
        Hủy
      </Button>,
      <Button key="ok" className="btn-save" onClick={apply} loading={loading}>
        Lưu thay đổi
      </Button>,
    ],
  };

  function label() {
    if (requireApproveToJoin) {
      return (
        <span className="text-white ml-2">
          Phòng họp không cho phép người ngoài vào họp
        </span>
      );
    }

    return (
      <span className="text-white ml-2">
        Phòng họp cho phép người ngoài vào họp
      </span>
    );
  }

  return (
    <Modal {...props}>
      <div className="popup-setting">
        <div className="popup-setting-bottom">
          <div className="flex items-center">
            <Switch onChange={onOptionChange} checked={requireApproveToJoin} />
            {label()}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PolicySetting;
