import { useDispatch, useSelector } from "react-redux";
import { actions } from "main/room/store";
import { FaPlus } from "react-icons/fa";

function SideBarFilterMode() {
  const dispatch = useDispatch();
  const isModerator = useSelector(({ user }) => user.isModerator);
  const connections = useSelector((state) => state.connections);
  const mode = useSelector(({ layout }) => layout.sidebarContent.mode);
  const requestjoins = useSelector((state) => state.requestjoin.requestjoins);

  return (
    <div className="meeting-sidebar-filter mt-2">
      <div
        className={`btn-join ${mode == "joined" ? "active" : ""}`}
        onClick={() => {
          dispatch(actions.updateLengthFilter("??"));
          dispatch(actions.showConnectionJoined());
        }}
      >
        <span>Tham gia ({connections.length})</span>
      </div>
      {isModerator && (
        <div
          className={`btn-pending ${mode == "pending" ? "active" : ""}`}
          onClick={() => {
            dispatch(actions.updateLengthFilter("??"));
            dispatch(actions.showConnectionPending());
          }}
        >
          <span>Chờ duyệt ({requestjoins.length})</span>
        </div>
      )}
      <div
        className={`${isModerator ? "btn-add" : "btn-pending"} ${
          mode == "add" ? "active" : ""
        }`}
        onClick={() => {
          dispatch(actions.updateLengthFilter("??"));
          dispatch(actions.showConnectionAdd());
        }}
      >
        <span>
          <FaPlus />
          <span className="ml-1">Mời</span>
        </span>
      </div>
    </div>
  );
}

export default SideBarFilterMode;
