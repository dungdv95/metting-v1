import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { FaRecordVinyl } from "react-icons/fa";
import { actions } from "main/room/store";
import { Tooltip } from "antd";

const Recorder = dynamic(
  () => import("main/room/components/RoomInsideFooter/Recorder"),
  { ssr: false }
);

function RecorButton() {
  const dispatch = useDispatch();
  const layout = useSelector(({ layout }) => layout.current);
  const canRecord = useSelector(({ perms }) => perms.canRecord);
  const active = useSelector(({ record }) => record.active);

  function startRecord() {
    dispatch(actions.setRecordActive(true));
  }

  if (layout === "webinar") {
    return (
      <Tooltip title="Tính năng ghi lại cuộc họp đang trong quá trình phát triển">
        <div className="btn-rss cursor-pointer btn-meet-disable">
          <FaRecordVinyl size={20} color="gray" />
        </div>
      </Tooltip>
    );
  }

  if (active) {
    return <Recorder />;
  }

  if (canRecord) {
    return (
      <Tooltip title="Bắt đầu ghi hình cuộc họp">
        <div onClick={startRecord} className="btn-rss cursor-pointer">
          <div className="cursor-pointer">
            <FaRecordVinyl size={20} color="gray" />
          </div>
        </div>
      </Tooltip>
    );
  }

  return (
    <Tooltip title="Bạn không có quyền ghi hình cuộc họp">
      <div className="btn-rss cursor-pointer btn-meet-disable">
        <FaRecordVinyl size={20} color="gray" />
      </div>
    </Tooltip>
  );
}

export default RecorButton;
