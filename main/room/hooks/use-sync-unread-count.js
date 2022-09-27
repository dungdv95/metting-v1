import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { actions } from "main/room/store";

function useSyncUnreadCount() {
  const dispatch = useDispatch();
  const messages = useSelector(({ message }) => message.messages);
  const atBottom = useSelector(({ message }) => message.atBottom);
  const visible = useSelector(({ layout }) => layout.sidebarVisible);
  const content = useSelector(({ layout }) => layout.sidebarContent.content);
  const atBottomRef = useRef(atBottom);
  const visibleRef = useRef();
  const contentRef = useRef();
  const messageCountRef = useRef();
  useEffect(() => {
    atBottomRef.current = atBottom;

  }, [atBottom])
  useEffect(() => {
    visibleRef.current = visible;
    contentRef.current = content;
    messageCountRef.current = messages.length;
  }, [visible, content, messages]);

  useEffect(() => {
    if (okToUpdateUnreadCount()) {
      dispatch(actions.incUnreacCountOne());
    }
  }, [messages.length, dispatch]);

  function okToUpdateUnreadCount() {
    if (messageCountRef.current === 0) {
      return false;
    }
    if (!visibleRef.current) {
      return true;
    }
    if (visibleRef.current && contentRef.current !== "chat") {
      return true;
    }
    if (visibleRef.current && contentRef.current == "chat" && !atBottomRef.current) {
      return true;
    }
    return false;
  }
}

export default useSyncUnreadCount;
