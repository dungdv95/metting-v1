import { useDispatch, useSelector } from "react-redux";
import { Badge } from "antd";
import { BiMessageDetail } from "react-icons/bi";
import { actions } from "main/room/store";
import { Tooltip } from "antd";

function ChatButton() {
  const dispatch = useDispatch();
  const unreadCount = useSelector(({ message }) => message.unreadCount);
  const content = useSelector(({ layout }) => layout.sidebarContent.content);
  const visible = useSelector(({ layout }) => layout.sidebarVisible);

  function toggleChat() {
    if (visible && content === "chat") {
      dispatch(actions.hideSidebar());
      return;
    }

    dispatch(actions.showChat());
  }

  function handleHover() {
    // dispatch(actions.resetUnreadCount());
  }

  function className() {
    if (visible && content === "chat") {
      return "btn-comment-alt cursor-pointer active";
    }
    return "btn-comment-alt cursor-pointer";
  }

  return (
    <Tooltip placement="top" title="Thảo luận">
      <Badge count={unreadCount} offset={[-18, -2]}>
        <div
          className={className()}
          onClick={toggleChat}
          onMouseEnter={handleHover}
        >
          <BiMessageDetail color="white" size={20} />
        </div>
      </Badge>
    </Tooltip>
  );
}

export default ChatButton;
