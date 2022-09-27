import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "main/room/store";
import apis from "api";

function ConfirmEndRoomModal() {
  const dispatch = useDispatch();
  const visible = useSelector(({ room }) => room.visibleConfirmEndRoom);
  const roomId = useSelector(({ room }) => room.id);

  function cancel() {
    dispatch(actions.hideVisibleConfirmEndRoom());
  }

  function end() {
    dispatch(actions.hideVisibleConfirmEndRoom());
    apis.closeRoom({ roomId }).catch(console.log);
  }

  const props = {
    visible,
    className: "popup-confirm-leave",
    closable: false,
    onCancel() {
      dispatch(actions.setVisibleConfirmLeaveRoom(false));
    },
    footer: [
      <div key="btnend" className="popup-content">
        <button className="popup-content-btn" onClick={cancel}>
          Huỷ
        </button>
        <button className="popup-content-btn" onClick={end} s>
          Đồng ý
        </button>
      </div>,
    ],
  };

  return (
    <Modal {...props}>
      <div className="title-modal">
        <div className="title-desc">
          <h5 className="mb-0">
            Hủy cuộc họp sẽ khiến mọi người thoát khỏi phòng!
          </h5>
          <p className="mb-0">Bạn có muốn tiếp tục?</p>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmEndRoomModal;
