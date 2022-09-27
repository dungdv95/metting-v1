import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "main/room/store";

function Tutorial() {
  const dispatch = useDispatch();
  const visible = useSelector(({ tutorial }) => tutorial.visible);
  const mode = useSelector(({ tutorial }) => tutorial.mode);

  function renderTitle() {
    if (mode === "device") {
      return "Hướng dẫn cấp quyền thiết bị";
    }

    if (mode === "record") {
      return "Hướng dẫn ghi hình";
    }

    return "Mode không xác định";
  }

  const props = {
    visible,
    title: renderTitle(),
    className: "modal-tutorial",
    closable: true,
    onCancel() {
      dispatch(
        actions.setVisibleTutorial({
          mode: "none",
          visible: false,
        })
      );
    },
  };

  return (
    <Modal {...props}>
      <div className="popup-tutorial">
        <img src="/tutorial/tutorial.gif" alt=""></img>
      </div>
    </Modal>
  );
}

export default Tutorial;
