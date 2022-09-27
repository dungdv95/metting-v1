
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
                return <span style={{ color: "#ff9900" }}>Mọi người</span>;
            case true:
                return (
                    <span >
                        <span >Bạn </span>
                        <br />
                        <span className=" bg-[#dd0000] text-[#fff] py-0.5 px-1.5 rounded-[25px]">Tin nhắn riêng</span>
                    </span>
                );
            default:
                return null;
        }
    }

    return (
        <div
            className=" flex justify-start items-start"
            onClick={() => {
                setSendTo({ id: from, displayName });
            }}
        >
            <div className={` ${renderTitle ? "" : "invisible"} cursor-pointer mt-1.5`}>
                {avatarUrl ? (
                    <div className=" w-7 h-7 relative">
                        <Avatar className="avatar" style={{ backgroundColor: "#F69C3B" }}>
                            {displayName.charAt(0).toUpperCase()}
                        </Avatar>
                    </div>
                ) : (
                    <div className=" w-7 h-7 rounded-full flex justify-center items-center">
                        <h5 className="mb-0">{shortNameByDisplayName(displayName)}</h5>
                    </div>
                )}
            </div>
            <div className=" ml-1.5 ">
                <h5 className={` ${renderTitle ? "" : "hidden"} mt-3 text-[11px] mb-1 text-start pl-2 text-[#ffffff]`}>
                    <span className="">
                        <Tooltip placement="top" title={`Click để gửi tin nhắn riêng tới ${displayName}`}>
                            {displayName.length > 25 ?
                                <span>{displayName.substring(0, 25) + "..."} tới </span>
                                :
                                <span>{displayName} tới </span>}
                        </Tooltip>
                    </span>

                    {renderTo(whisper)}
                </h5>
                <div className="">
                    <div className=" flex items-center justify-start">
                        <h5 className=" other max-w-[70vw] px-2 py-3 bg-[#2a313e] rounded-xl mb-0.5 inline-block relative break-words"
                            onClick={toggle} >
                            <p className="font-normal text-[14px] leading-[20px] text-[#ffffff] opacity-80 mb-0 whitespace-normal">{content}</p>
                        </h5>
                        <div className=" other  flex flex-row-reverse">
                            <i className="far fa-smile" />
                            <i className="fas fa-share" />
                            <i className="far fa-comment-dots" />
                        </div>
                    </div>
                    {showDate && (
                        <span className=" not-italic font-normal text-[12px] leading-[16px] text-[#959595] text-center">{formatDate(date)}</span>
                    )}
                </div>
            </div>
        </div >
    );
}


export default RecvMessage;
