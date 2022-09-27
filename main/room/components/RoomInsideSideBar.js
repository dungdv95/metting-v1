import { useSelector } from "react-redux";
import SidebarChat from "main/room/components/SideBarChat";
import SidebarConnectionList from "main/room/components/SideBarConnectionList";
import { useSyncUnreadCount } from "main/room/hooks";

function RoomInsideSideBar() {
  const visible = useSelector(({ layout }) => layout.sidebarVisible);
  const content = useSelector(({ layout }) => layout.sidebarContent.content);

  useSyncUnreadCount();

  return (
    <div className={`meeting-sidebar ${visible && "active"}`}>
      {content === "chat" ? <SidebarChat /> : <SidebarConnectionList />}
    </div>
  );
}

export default RoomInsideSideBar;
