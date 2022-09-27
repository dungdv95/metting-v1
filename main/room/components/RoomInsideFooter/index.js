import MicButton from "main/room/components/RoomInsideFooter/MicButton";
import CamButton from "main/room/components/RoomInsideFooter/CamButton";
import ShareButton from "main/room/components/RoomInsideFooter/ShareButton";
import LeaveRoomButton from "main/room/components/RoomInsideFooter/LeaveRoomButton";
import ListConnectionButton from "main/room/components/RoomInsideFooter/ListConnectionButton";
import ChatButton from "main/room/components/RoomInsideFooter/ChatButton";
import FullscreenButton from "main/room/components/RoomInsideFooter/FullscreenButton";
import RecordButton from "main/room/components/RoomInsideFooter/RecordButton";
import RaiseHandButton from "main/room/components/RoomInsideFooter/RaiseHandButton";
import SettingButton from "main/room/components/RoomInsideFooter/SettingButton";
import ReactionButton from "main/room/components/RoomInsideFooter/ReactionButton";
import ModeratorLeaveModal from "main/room/components/RoomInsideFooter/ModeratorLeaveModal";
import ConfirmEndRoomModal from "main/room/components/RoomInsideFooter/ConfirmEndRoomModal";

function RoomInsideFooter() {
  return (
    <div className="footer-meeting">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-left">
            <RaiseHandButton />
            <ReactionButton />
          </div>
          <div className="footer-center">
            <MicButton />
            <CamButton />
            <ShareButton />
            <div className="box-hr" />
            <RecordButton />
            <LeaveRoomButton />
          </div>
          <div className="footer-right">
            <div className="footer-right-box">
              <ListConnectionButton />
              <ChatButton />
              <SettingButton />
              <FullscreenButton />
            </div>
          </div>
        </div>
      </div>
      <ModeratorLeaveModal />
      <ConfirmEndRoomModal />
    </div>
  );
}

export default RoomInsideFooter;
