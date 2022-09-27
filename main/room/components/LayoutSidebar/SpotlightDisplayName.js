import { Tooltip } from "antd";
import { useSelector } from "react-redux";
import MicStatusIcon from "main/room/components/MicStatusIcon";
import { MdOutlineScreenShare } from "react-icons/md";

const MAX_LENGTH = 25;

function SpotlightDisplayName({ micEnable, displayName, ownerId }) {
  const ownerIdShare = useSelector(
    ({ screensharing }) => screensharing.ownerId
  );
  const modeShare = useSelector(({ screensharing }) => screensharing.mode);
  const ioConnectionId = useSelector(({ room }) => room.socketio.connectionId);
  const shareEnble = (modeShare === "local" && ownerId == ioConnectionId) || ownerIdShare == ownerId
  return (
    <div className="absolute bottom-0 left-0 bg-gray-500/50 p-1 rounded max-w-full 	">
      <div className="inline-flex	 items-center w-full">
        {micEnable !== undefined && <MicStatusIcon enable={micEnable} />}
        {shareEnble && <MdOutlineScreenShare size={22} color="green" className="inline mr-1" />}

        <DisplayName text={displayName} />
      </div>
    </div>
  );
}

function DisplayName({ text }) {
  if (text.length > MAX_LENGTH) {
    return (
      <Tooltip placement="topLeft" title={text}>
        <span className="text-white w-full">{text}</span>
      </Tooltip>
    );
  }

  return <span className="text-white">{text}</span>;
}

export default SpotlightDisplayName;
