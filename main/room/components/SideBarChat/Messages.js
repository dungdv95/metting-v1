
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "main/room/store";
import RecvMessage from "main/room/components/SideBarChat/RecvMessage"
import SentMessage from "main/room/components/SideBarChat/SentMessage"

import { BsArrowDownCircleFill, BsBellFill } from "react-icons/bs";
import { Tooltip } from "antd";

function Messages() {
    const dispatch = useDispatch();
    const ioConnectionId = useSelector(({ room }) => room.socketio.connectionId);
    const messages = useSelector(({ message }) => message.messages);
    const chatContent = useRef(null);
    const handleScroll = () => {
        const areaRender = chatContent.current?.scrollHeight - chatContent.current?.scrollTop
        const bottom = areaRender > chatContent.current?.clientHeight - 15 && areaRender < chatContent.current?.clientHeight + 15;
        dispatch(actions.setAtBottom(bottom))
        if (bottom) {
            dispatch(actions.resetUnreadCount())
        }
    }
    return (
        <div
            className="meeting-chat-content"
            ref={chatContent}
            onScroll={handleScroll}
        >
            {messages.map(({ from, toUser, whisper, ...others }, index, arr) => {
                let renderTitle = true;
                if (index > 0)
                    renderTitle = !(
                        arr[index - 1].from == from &&
                        arr[index - 1].toUser == toUser &&
                        arr[index - 1].whisper == whisper
                    );
                if (ioConnectionId === from) {
                    return (
                        <SentMessage
                            key={index}
                            toUser={toUser}
                            renderTitle={renderTitle}
                            whisper={whisper}
                            {...others}
                        />
                    );
                }
                return (
                    <RecvMessage
                        key={index}
                        from={from}
                        toUser={toUser}
                        whisper={whisper}
                        renderTitle={renderTitle}
                        {...others}
                    />
                );
            })}
            <ScrollBottom chatContent={chatContent} />
        </div>
    );
}
function ScrollBottom({ chatContent }) {
    const dispatch = useDispatch();

    const atBottom = useSelector(({ message }) => message.atBottom);
    const ioConnectionId = useSelector(({ room }) => room.socketio.connectionId);
    const messages = useSelector(({ message }) => message.messages);
    const unreadCount = useSelector(({ message }) => message.unreadCount);
    const visibleSidebar = useSelector(({ layout }) => layout.sidebarVisible);
    const content = useSelector(({ layout }) => layout.sidebarContent.content);

    const scrollBottom = () => {
        chatContent.current.scrollTop = chatContent.current.scrollHeight;
    }

    //scroll to bottom when open chat
    useEffect(() => {
        if (visibleSidebar && content === "chat") {
            dispatch(actions.resetUnreadCount())
            chatContent.current.scrollTop = chatContent.current.scrollHeight;
        }
    }, [content, visibleSidebar, dispatch, chatContent])

    useEffect(() => {
        if (messages.length >= 1 && atBottom) {
            chatContent.current.scrollTop = chatContent.current.scrollHeight;
        }
    }, [ioConnectionId, messages, atBottom, chatContent]);


    if (!atBottom) {
        return (
            <>
                {unreadCount >= 1 ?
                    <Tooltip placement="topLeft" title="Có tin nhắn mới!">
                        <div className="scroll-bottom  new-message"
                            onClick={scrollBottom}>
                            <BsArrowDownCircleFill />
                            <i className="icon-bell"><BsBellFill /></i>
                        </div>
                    </Tooltip> :
                    <div className="scroll-bottom"
                        onClick={scrollBottom}>
                        <BsArrowDownCircleFill />
                    </div>}
            </>
        )
    }
}

export default Messages;
