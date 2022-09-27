import { useDispatch, useSelector } from "react-redux";
import { BsPeople } from "react-icons/bs";
import { actions } from "main/room/store";
import { Tooltip, Badge } from "antd";

function ListConnectionButton() {
  const dispatch = useDispatch();
  const content = useSelector(({ layout }) => layout.sidebarContent.content);
  const visible = useSelector(({ layout }) => layout.sidebarVisible);
  const connections = useSelector(({ connections }) => connections);

  function toggleListConnection() {
    if (visible && content === "connection") {
      dispatch(actions.hideSidebar());
      return;
    }
    dispatch(actions.toggleConnectionList());
  }

  function className() {
    if (visible && content === "connection") {
      return "btn-comment-alt cursor-pointer active";
    }
    return "btn-comment-alt cursor-pointer";
  }

  return (
    <Tooltip placement="top" title="Danh sách người tham gia">
      <Badge count={connections.length} offset={[-18, -2]} color="geekblue">
        <div className={className()} onClick={toggleListConnection}>
          <BsPeople color="white" size={20} />
        </div>
      </Badge>
    </Tooltip>
  );
}

export default ListConnectionButton;
