
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    FaAngleDown,
    FaPaperPlane,
    FaLaugh,
} from "react-icons/fa";

import { useJanusInstance } from "main/room/hooks";
import { actions } from "main/room/store";
import { Popover } from "antd";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import SetReceiver from "main/room/components/SideBarChat/SetReceiver"

function MessageForm() {
    const janus = useJanusInstance();
    const dispatch = useDispatch();
    const avatarUrl = useSelector(({ user }) => user.avatarUrl);
    const displayName = useSelector(({ user }) => user.displayName);
    const ioConnectionId = useSelector(({ room }) => room.socketio.connectionId);
    const idSendTo = useSelector(({ message }) => message.sendTo.id);
    const displayNameSendTo = useSelector(({ message }) => message.sendTo.displayName);
    const contentMessage = useSelector(({ message }) => message.contentMessage);
    const visibleSidebar = useSelector(({ layout }) => layout.sidebarVisible);
    const content = useSelector(({ layout }) => layout.sidebarContent.content);
    const inputMessage = useRef(contentMessage)
    useEffect(() => {
        if (visibleSidebar && content === "chat") {
            setTimeout(function () {
                inputMessage.current.selectionStart = inputMessage.current.selectionEnd = inputMessage.current.value.length;
                inputMessage.current.focus();
            }, 0)
        }
    }, [content, visibleSidebar, dispatch])
    const setContentMessage = (content) => {
        dispatch(actions.setContentMessage(content))
    }
    function sendMessage() {
        if (contentMessage.trim() != "") {
            if (contentMessage.indexOf("[@reaction]") !== -1) {
                const d = new Date();
                var contentReaction = contentMessage.replace("[@reaction]", "").trim();
                var id = `${ioConnectionId}-${d.getTime()}`;
                var style = Math.floor(Math.random() * 10 + 1);
                dispatch(
                    actions.setCurrentReaction({
                        content: contentReaction,
                        style,
                        id: id,
                    })
                );
                setTimeout(() => {
                    dispatch(actions.removeReaction());
                }, 2500);

                janus
                    .sendMessage({
                        to: idSendTo,
                        senderDisplayName: displayName,
                        avatarUrl,
                        content: contentMessage,
                        id: id,
                    })
                    .then(() => setContentMessage(""));
            } else {
                janus
                    .sendMessage({
                        to: idSendTo,
                        senderDisplayName: displayName,
                        avatarUrl,
                        content: contentMessage,
                    })
                    .then(() => setContentMessage(""));

                if (idSendTo !== undefined) {
                    dispatch(
                        actions.appendMessage({
                            from: ioConnectionId,
                            whisper: true,
                            content: contentMessage,
                            date: new Date(),
                            toUser: displayNameSendTo,
                        })
                    );
                }
            }
        }
    }
    function onKeyup(e) {
        if (e.key === "Enter" || e.keyCode === 13) {
            sendMessage();
        }
    }

    const contenteEmoji = () => {
        return (
            <Picker
                data={data}
                onEmojiSelect={(emoji) => {
                    const cursor = inputMessage.current.selectionStart;
                    const newCursor = cursor + emoji.native.length
                    setContentMessage(`${contentMessage.slice(0, cursor)}${emoji.native}${contentMessage.slice(cursor)}`);
                    setTimeout(function () {
                        inputMessage.current.selectionStart = inputMessage.current.selectionEnd = newCursor;
                        inputMessage.current.focus()
                    }, 0)
                }
                }
            />
        );
    };

    return (
        <div className="meeting-chat-footer">
            <div className="meeting-chat-top">
                <div className="meeting-chat-top-left">
                    <span className="meeting-chat-top-label">Tới:</span>
                    <Popover
                        overlayClassName="custom-popover-chat-to"
                        placement="top"
                        trigger="click"
                        getPopupContainer={(trigger) => trigger.parentElement}
                        content={SetReceiver}
                    >
                        <button className="meeting-chat-to">
                            <span>{displayNameSendTo}</span>
                            <FaAngleDown className="text-white ml-2 mr-1" size={10} />
                        </button>
                    </Popover>
                </div>
            </div>
            <div className="meeting-chat-bottom">
                <div className="chat-footer-input w-full">
                    <textarea
                        className="scroll-bar"
                        ref={inputMessage}
                        type="text"
                        placeholder="Nội dung tin nhắn"
                        onChange={(e) => setContentMessage(e.target.value)}
                        value={contentMessage}
                        onKeyUp={onKeyup}
                    />
                    <Popover
                        overlayClassName="custom-popover-emoji-chat"
                        placement="topRight"
                        content={contenteEmoji}
                        trigger="click"
                        getPopupContainer={(trigger) => trigger.parentElement}
                    >
                        <FaLaugh size={15} color="white" className="icon-emoji" />
                    </Popover>
                </div>
                <div className="chat-footer-send" onClick={sendMessage}>
                    <div className="chat-footer-icon">
                        <FaPaperPlane
                            size={16}
                            color={contentMessage.trim() != "" ? "white" : "gray"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}


export default MessageForm;
