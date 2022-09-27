
import { useState } from "react";
import { useSelector } from "react-redux";
import { shortNameByDisplayName, formatDate } from "main/room/utils";
import { Avatar } from "antd";


function SentMessage({ content, date, whisper, toUser, renderTitle }) {
    const avatarUrl = useSelector(({ user }) => user.avatarUrl);
    const displayName = useSelector(({ user }) => user.displayName);
    const [showDate, setShowDate] = useState(false);

    function toggle() {
        setShowDate(!showDate);
    }

    return (
        <div className="chat-item me">
            <div className={`chat-item-avatar ${renderTitle ? "" : "invisible"}`}>
                {avatarUrl ? (
                    <div className="chat-user-avatar-img">
                        <Avatar className="avatar" style={{ backgroundColor: "#F69C3B" }}>
                            {displayName.charAt(0).toUpperCase()}
                        </Avatar>                    </div>
                ) : (
                    <div className="chat-user-avatar-text">
                        <h5 className="mb-0">{shortNameByDisplayName(displayName)}</h5>
                    </div>
                )}
            </div>
            <div className="chat-item-desc">
                {whisper ? (
                    <h5 className={`chat-item-to-user  ${renderTitle ? "" : "hidden"}`}>
                        Tin nhắn riêng đến
                        <span className="text-red-500"> {toUser}</span>
                    </h5>
                ) : (
                    <div className={`chat-item-to-user  ${renderTitle ? "" : "hidden"}`}>
                        Tin nhắn đến mọi người
                    </div>
                )}
                <div className="chat-item-list-text" onClick={toggle}>
                    <div style={{ justifyContent: "flex-end", display: "flex" }}>
                        <h5 className="chat-item-desc-text me">
                            <p>{content}</p>
                        </h5>
                    </div>
                    {showDate && (
                        <span className="chat-item-desc-time">{formatDate(date)}</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SentMessage;
