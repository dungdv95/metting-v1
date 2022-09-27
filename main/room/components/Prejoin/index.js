import dynamic from "next/dynamic";
import JoinButton from "main/room/components/Prejoin/JoinButton";
import AudioStatus from "main/room/components/Prejoin/AudioStatus";
import VideoStatus from "main/room/components/Prejoin/VideoStatus";
import UserAppearencePreview from "main/room/components/Prejoin/UserAppearencePreview";

const PermissionsWarning = dynamic(
  () => import("main/room/components/Prejoin/PermissionWarning"),
  { ssr: false }
);

const RoomInfo = dynamic(
  () => import("main/room/components/Prejoin/RoomInfo"),
  { ssr: false }
);

const Header = dynamic(() => import("main/room/components/Prejoin/Header"), {
  ssr: false,
});

const BgStatus = dynamic(
  () => import("main/room/components/Prejoin/BgStatus"),
  { ssr: false }
);

const MicDemo = dynamic(() => import("main/room/components/Prejoin/MicDemo"), {
  ssr: false,
});

const Tutorial = dynamic(() => import("main/room/components/Tutorial"), {
  ssr: false,
});

function Prejoin() {
  return (
    <div className="meet-pending">
      <div className="meet-container">
        <Header />
        <PermissionsWarning />

        <div className="meet-modal">
          <div className="meet-modal-container">
            <div className="meet-modal-head">
              <RoomInfo />
            </div>
            <UserAppearencePreview />
            <div className="meet-action">
              <div className="meet-action-box">
                <div className="meet-action-left">
                  <AudioStatus />
                  <VideoStatus />
                  <BgStatus />
                </div>
                <JoinButton />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MicDemo />
      <Tutorial />
    </div>
  );
}

export default Prejoin;
