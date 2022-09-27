
import { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "main/room/store";
import { shortNameByDisplayName, formatDate } from "main/room/utils";
import { Tooltip, Avatar } from "antd";

function RecvMessage({
    avatarUrl,
    displayName,
    content,
    date,
    from,
    whisper,
    renderTitle,
}) {
    const [showDate, setShowDate] = useState(false);
    const dispatch = useDispatch();

    const setSendTo = (user) => {
        dispatch(actions.setSendTo(user))
    }

    function toggle() {
        setShowDate(!showDate);
    }
    function renderTo(whisper) {
        switch (whisper) {
            case undefined:
                return <span className="chat-to-everyone">Mọi người</span>;
            case true:
                return (
                    <span className="chat-to-me">
                        <span className="chat-to-me-text">Bạn </span>
                        <br />
                        <span className="private-message">Tin nhắn riêng</span>
                    </span>
                );
            default:
                return null;
        }
    }

    return (
        <div
            className="chat-item"
            onClick={() => {
                setSendTo({ id: from, displayName });
            }}
        >
            <div className={`chat-item-avatar ${renderTitle ? "" : "invisible"}`}>
                {avatarUrl ? (
                    <div className="chat-user-avatar-img">
                        <Avatar className="avatar" style={{ backgroundColor: "#F69C3B" }}>
                            {displayName.charAt(0).toUpperCase()}
                        </Avatar>
                    </div>
                ) : (
                    <div className="chat-user-avatar-text">
                        <h5 className="mb-0">{shortNameByDisplayName(displayName)}</h5>
                    </div>
                )}
            </div>
            <div className="chat-item-desc">
                <h5 className={`chat-item-desc-name ${renderTitle ? "" : "hidden"}`}>
                    <span className="chat-item-desc-name-item">
                        <Tooltip placement="top" title={`Click để gửi tin nhắn riêng tới ${displayName}`}>
                            {displayName.length > 25 ?
                                <span>{displayName.substring(0, 25) + "..."} tới </span>
                                :
                                <span>{displayName} tới </span>}
                        </Tooltip>
                    </span>

                    {renderTo(whisper)}
                </h5>
                <div className="chat-item-list-text">
                    <div className="chat-item-desc-box">
                        <h5 className="chat-item-desc-text other "
                            onClick={toggle} >
                            <p>{content}</p>
                        </h5>
                        <div className="chat-item-emotion-action other">
                            <i className="far fa-smile" />
                            <i className="fas fa-share" />
                            <i className="far fa-comment-dots" />
                        </div>
                    </div>
                    {showDate && (
                        <span className="chat-item-desc-time">{formatDate(date)}</span>
                    )}
                </div>
            </div>
        </div >
    );
}


export default RecvMessage;
