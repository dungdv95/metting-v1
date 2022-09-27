
import message from "main/room/components/message";
import { useDispatch, useSelector } from "react-redux";

function AddConnection() {
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
    const handelCopyText = text => {
        copyToClipboard(text).then(res => {
            message.success("Đã sao chép thành công");
        });
    };
    return (
        <div className="meeting-sidebar-content active">
            <div className="meeting-sidebar-invite">

                <div className="meeting-sidebar-bottom">
                    <h5>Sử dụng liên kết:</h5>
                    <div className="content-copy">{inviteUrl}</div>
                    <button
                        className="btn-copy-link"
                        onClick={() => handelCopyText(inviteUrl)}
                    >
                        <i className="fas fa-copy"></i>Copy liên kết
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddConnection;