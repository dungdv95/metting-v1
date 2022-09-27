import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { actions } from "main/room/store";
import ConnectionJoined from "main/room/components/SideBarConnectionList/ConnectionJoined";
import SideBarSearch from "main/room/components/SideBarConnectionList/SideBarSearch";
import SideBarFilterMode from "main/room/components/SideBarConnectionList/SideBarFilterMode";
import RequestJoins from "main/room/components/SideBarConnectionList/RequestJoins";
import AddConnection from "main/room/components/SideBarConnectionList/AddConnection";

function ConntecntionList() {
  const dispatch = useDispatch();
  const isModerator = useSelector(({ user }) => user.isModerator);

  function hide() {
    dispatch(actions.hideSidebar());
  }

  return (
    <div className="meetting-container">
      <div className="meeting-sidebar-head">
        <h3 className="meeting-sidebar-title mb-0">
          Danh sách thành viên
          <span> {isModerator && "(Bạn là Quản trị viên)"}</span>
        </h3>
        <FaTimes
          color="white"
          size={15}
          className="cursor-pointer"
          onClick={hide}
        />
      </div>
      <SideBarFilterMode />
      <SideBarSearch />
      <Content />
    </div>
  );
}

function Content() {
  const mode = useSelector(({ layout }) => layout.sidebarContent.mode);

  switch (mode) {
    case "joined":
      return <ConnectionJoined />;
    case "pending":
      return <RequestJoins />;
    case "add":
      return <AddConnection />;
  }
}

export default ConntecntionList;
