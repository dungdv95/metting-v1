import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { actions } from "main/room/store";

function ModeratorLeaveModal() {
  const dispatch = useDispatch();
  const router = useRouter();
  const visible = useSelector(({ room }) => room.visibleConfirmLeaveRoom);
  const backUrl = useSelector(({ room }) => room.backUrl);

  function leave() {
    router.push(backUrl, undefined, { sallow: true });
  }

  function end() {
    dispatch(actions.showVisibleConfirmEndRoom());
  }

  const props = {
    visible,
    className: "popup-confirm-leave",
    closable: false,
    onCancel() {
      dispatch(actions.setVisibleConfirmLeaveRoom(false));
    },
    footer: [
      <div key="btnleave" className="popup-content">
        <button className="popup-content-btn" onClick={leave}>
          Chỉ rời đi
        </button>
        <button className="popup-content-btn" onClick={end}>
          Kết thúc
        </button>
      </div>,
    ],
  };

  return (
    <Modal {...props}>
      <div className="title-modal">
        <div className="title-img">
          <img src="/images/iconBtnOff.png" alt="" />
        </div>
        <div className="title-desc">
          <h5 className="mb-0">Xác nhận rời cuộc họp</h5>
          <p className="mb-0">
            Bạn có muốn kết thúc cuộc họp này đối với mọi người?
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default ModeratorLeaveModal;
