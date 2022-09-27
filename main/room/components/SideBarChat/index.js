
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    FaTimes,
} from "react-icons/fa";
import Messages from "main/room/components/SideBarChat/Messages";
import MessageForm from "main/room/components/SideBarChat/MessageForm";
import { actions } from "main/room/store";

function SidebarChat() {
    const dispatch = useDispatch();
    function hide() {
        dispatch(actions.hideSidebar());
    }
    return (
        <div className="meetting-container meeting-discuss">
            <div className="meeting-sidebar-head">
                <h3 className="meeting-sidebar-title mb-0">Thảo luận</h3>
                <FaTimes
                    size={16}
                    color="white"
                    className="cursor-pointer"
                    onClick={hide}
                />
            </div>
            <Messages />
            <div className="meeting-sidebar-chat">
                <MessageForm />
            </div>
        </div>
    );
}
export default SidebarChat;
