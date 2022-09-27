
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    FaCheck,
    FaSearch,
} from "react-icons/fa";
import { useDebounceCallback } from "main/room/hooks";
import { actions } from "main/room/store";
import { removeVietnameseTones } from "main/room/utils";


function SetReceiver() {
    const dispatch = useDispatch();
    const connections = useSelector(({ connections }) => connections);
    const [dataFilter, setDataFilter] = useState(connections);
    const [searchContent, setSearchContent] = useState("");
    const ioConnectionId = useSelector(({ room }) => room.socketio.connectionId);
    const idSendTo = useSelector(({ message }) => message.sendTo.id);

    useEffect(() => {
        debouncedHandleFilter(searchContent);
    }, [connections, debouncedHandleFilter, searchContent]);

    useEffect(() => {
        if (
            dataFilter.length > 0 &&
            dataFilter[0].id !== undefined &&
            searchContent == ""
        ) {
            let tmp = dataFilter.slice();
            tmp.unshift({ id: undefined, displayName: "Mọi người" });
            setDataFilter(tmp);
        }
    }, [dataFilter, searchContent]);

    const debouncedHandleFilter = useDebounceCallback((searchContent) => {
        let tmpConnection = connections.slice();
        if (tmpConnection.length > 0 && tmpConnection[0].id !== undefined)
            tmpConnection.unshift({
                id: undefined,
                displayName: "Mọi người",
            });
        let tmpDataFilter = tmpConnection.filter((connection) => {
            let checkName = searchContent
                ? removeVietnameseTones(connection.displayName)
                    .toUpperCase()
                    .indexOf(removeVietnameseTones(searchContent).toUpperCase()) !=
                -1 ||
                connection.displayName
                    .toUpperCase()
                    .indexOf(searchContent.toUpperCase()) != -1
                : true;
            return checkName;
        });
        setDataFilter(tmpDataFilter);
        setSearchContent(searchContent);
    }, 250);

    const setSendTo = (user) => {
        dispatch(actions.setSendTo(user))
    }
    return (
        <div className="content-chat-to">
            <div className="content-chat-search">
                <FaSearch className="searchImg" />
                <input
                    type="text"
                    placeholder="Tìm kiếm"
                    onChange={(e) => setSearchContent(e.target.value)}
                />
            </div>

            <div className="content-list-user">
                {dataFilter.map((user, index) => {
                    if (ioConnectionId === user.id) {
                        return null;
                    }
                    return (
                        <div
                            className={`content-user-item ${idSendTo === user.id && "active"}`}
                            onClick={() => setSendTo(user)}
                            key={index}
                        >
                            <span className="user-item-name">{user.displayName}</span>
                            <div className={`${idSendTo === user.id ? "check-active" : "check-inactive"}`}>
                                <FaCheck />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SetReceiver;
