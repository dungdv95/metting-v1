import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Tooltip } from "antd";
import { FaTimes } from "react-icons/fa";
import { useDebounceCallback } from "main/room/hooks";
import { removeVietnameseTones } from "main/room/utils";

import { actions } from "main/room/store";
import api from "api";

function RequestJoins() {
  const dispatch = useDispatch();
  const requestjoins = useSelector(
    ({ requestjoin }) => requestjoin.requestjoins
  );
  const searchNameContent = useSelector(({ search }) => search.checkName);

  const [dataFilter, setDataFilter] = useState(requestjoins);

  useEffect(() => {
    debouncedHandleFilter(searchNameContent);
  }, [requestjoins, debouncedHandleFilter, searchNameContent]);

  const debouncedHandleFilter = useDebounceCallback((searchNameContent) => {
    const tmpConnection = requestjoins.slice();
    const tmpDataFilter = tmpConnection.filter((connection) => {
      return searchNameContent
        ? removeVietnameseTones(connection.Email)
            .toUpperCase()
            .indexOf(removeVietnameseTones(searchNameContent).toUpperCase()) !=
            -1 ||
            connection.Email.toUpperCase().indexOf(
              searchNameContent.toUpperCase()
            ) != -1
        : true;
    });
    dispatch(actions.updateLengthFilter(tmpDataFilter.length));
    setDataFilter(tmpDataFilter);
  }, 250);

  return (
    <div className={`meeting-sidebar-content active`}>
      <div className="meeting-sidebar-join">
        {dataFilter?.map((c) => (
          <RequestJoin key={c.email} {...c} />
        ))}
      </div>
    </div>
  );
}

function RequestJoin({ email }) {
  const roomId = useSelector(({ room }) => room.id);
  const moderatorId = useSelector(({ room }) => room.socketio.connectionId);

  function tackle(approve) {
    api
      .tackleRequestJoin({ roomId, moderatorId, email, approve })
      .catch(console.log)
      .finally(console.log);
  }

  return (
    <div className="meeting-join-item">
      <div className="join-item-left">
        <div className="join-item-avatar">
          <Avatar className="avatar">{email.charAt(0).toUpperCase()}</Avatar>
        </div>
        <div className="join-item-desc">
          {email.length > 20 ? (
            <Tooltip placement="top" title={email}>
              <h5 className="mb-0">{email.slice(0, 20) + "..."}</h5>
            </Tooltip>
          ) : (
            <h5 className="mb-0">{email}</h5>
          )}
        </div>
      </div>
      <div className="join-item-right">
        <button className="join-item-btn" onClick={() => tackle(true)}>
          Đồng ý
        </button>
        <FaTimes color="#ff5959" onClick={() => tackle(false)} />
      </div>
    </div>
  );
}

export default RequestJoins;
