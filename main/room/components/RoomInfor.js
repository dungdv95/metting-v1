import { Modal, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import message from "main/room/components/message";
import { actions } from "main/room/store";
import { FaCopy } from "react-icons/fa";

function RoomInfor() {
  const dispatch = useDispatch();
  const visible = useSelector(({ room }) => room.infoPopupVisible);
  const id = useSelector(({ room }) => room.id);
  const displayName = useSelector(({ user }) => user.displayName);
  const name = useSelector(({ room }) => room.name);
  const password = useSelector(({ room }) => room.password);
  const inviteUrl = useSelector(({ room }) => room.inviteUrl);

  const stringInvite =
    `${displayName} mời bạn tham gia cuộc họp trên MobiFone Meeting\n` +
    `Tên cuộc họp: ${name}\n` +
    `Tham dự cuộc họp qua link: ${inviteUrl}\n` +
    `Mã cuộc họp: ${id}\n` +
    `Mật khẩu: ${password}`;

  function copyToClipboard(textToCopy) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(textToCopy);
    }
  }

  function copyText(text) {
    copyToClipboard(text).then(() => {
      message.success("Đã sao chép thành công");
    });
  }

  function closePopup() {
    dispatch(actions.setRoomInfoPopupVisible(false));
  }

  const props = {
    visible,
    title: "Thông tin phòng họp",
    className: "modal-meeting-info",
    closable: false,
    onCancel() {
      closePopup();
    },
    footer: [
      <button key="cancel" className="btn-apply" onClick={closePopup}>
        OK
      </button>,
    ],
  };

  return (
    <Modal {...props}>
      <div className="popup-info">
        <div className="popup-info-item">
          <div className="popup-info-item-left">ID:</div>
          <div className="popup-info-item-right">
            {id}
            <span onClick={() => copyText(id)}>
              <Tooltip placement="top" title="Sao chép">
                <FaCopy className="cursor-pointer" />
              </Tooltip>
            </span>
          </div>
        </div>
        <div className="popup-info-item">
          <div className="popup-info-item-left">Liên kết:</div>
          <div className="popup-info-item-right">
            {inviteUrl.slice(0, 50) + "..."}
            <span onClick={() => copyText(inviteUrl)}>
              <Tooltip placement="top" title="Sao chép">
                <FaCopy className="cursor-pointer" />
              </Tooltip>
            </span>
          </div>
        </div>
        <div className="popup-info-item">
          <div className="popup-info-item-left">Mật khẩu:</div>
          <div className="popup-info-item-right">
            {password}
            <span onClick={() => copyText(password)}>
              <Tooltip placement="top" title="Sao chép">
                <FaCopy className="cursor-pointer" />
              </Tooltip>
            </span>
          </div>
        </div>
        <div className="popup-info-item">
          <div className="popup-info-item-left">Mời họp nhanh:</div>
          <div className="popup-info-item-right">
            <span onClick={() => copyText(stringInvite)}>
              <Tooltip placement="top" title="Sao chép">
                <FaCopy className="cursor-pointer" />
              </Tooltip>
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default RoomInfor;
