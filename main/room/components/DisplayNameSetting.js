import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "main/room/store";
import { containSpecialCharactor } from "main/room/utils";
import message from "main/room/components/message";
import apis from "api";
import { useEffect, useRef } from "react";

function DisplayNameSetting() {
  const dispatch = useDispatch();
  const roomId = useSelector(({ room }) => room.id);
  const visible = useSelector(({ setting }) => setting.displayName.visible);
  const displayName = useSelector(({ setting }) => setting.displayName.current);
  const ioConnectionId = useSelector(
    ({ setting }) => setting.displayName.connectionId
  );
  const inputRef = useRef(displayName)
  useEffect(() => {
    if (visible) {
      setTimeout(function () {
        inputRef.current.selectionStart = inputRef.current.selectionEnd = inputRef.current.value.length;
        inputRef.current.focus();
      }, 0)
    }
  }, [visible])
  function onDisplayNameChange(e) {
    const input = e.target.value.trim();
    if (input.length > 60) {
      message.warning("Tên hiển thị không được dài quá 60 ký tự");
      return;
    }

    if (containSpecialCharactor(input)) {
      message.warning("Tên không được chứa ký tự đặc biệt");
      return;
    }

    dispatch(actions.setSettingDisplayNameCurrent(input));
  }

  function hide() {
    dispatch(actions.hideSettingDisplayName());
  }

  function apply() {
    if (displayName.length > 0) {
      dispatch(actions.hideSettingDisplayName());

      apis
        .updateDisplayName({
          roomId,
          ioConnectionId,
          newDisplayName: displayName,
        })
        .catch(console.log);
      return;
    }
    message.warning("Không được để trống tên");
  }

  const props = {
    visible,
    title: "Thay đổi tên",
    closable: false,
    className: "modal-advanced-setting",
    onCancel() {
      hide();
    },
    footer: [
      <button key="cancel" className="btn-end" onClick={hide}>
        Hủy
      </button>,
      <button key="ok" className="btn-save" onClick={apply}>
        Lưu thay đổi
      </button>,
    ],
  };

  return (
    <Modal {...props}>
      <div className="popup-setting">
        <div className="popup-setting-bottom">
          <div className="popup-setting-change-name">
            {displayName.length > 40 ? (
              <h5>Tên đang được sử dụng: {displayName.slice(0, 40) + "..."}</h5>
            ) : (
              <h5>Tên đang được sử dụng: {displayName}</h5>
            )}
            <div className="popup-setting-name-input">
              <input
                ref={inputRef}
                value={displayName}
                onChange={onDisplayNameChange}
                placeholder="Nhập tên người dùng"
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DisplayNameSetting;
