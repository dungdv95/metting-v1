import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { IconOff } from "main/room/components/icons";
import { Tooltip } from "antd";
import { actions } from "main/room/store";

function LeaveRoomButton() {
  const dispatch = useDispatch();
  const router = useRouter();
  const backUrl = useSelector(({ room }) => room.backUrl);
  const isModerator = useSelector(({ user }) => user.isModerator);

  function leave() {
    if (isModerator) {
      dispatch(actions.setVisibleConfirmLeaveRoom(true));
    } else {
      router.push(backUrl, undefined, { sallow: true });
    }
  }

  return (
    <Tooltip placement="top" title="Kết thúc">
      <div className="btn-off cursor-pointer" onClick={leave}>
        <IconOff />
      </div>
    </Tooltip>
  );
}

export default LeaveRoomButton;
