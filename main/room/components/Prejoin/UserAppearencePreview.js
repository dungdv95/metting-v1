import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "main/room/store";
import message from "main/room/components/message";
import { useLocalCamTrack } from "main/room/hooks";
import { containSpecialCharactor } from "main/room/utils";

function UserAppearencePreview() {
  const enable = useSelector(({ device }) => device.cam.enable);

  if (enable) {
    return (
      <div className="meet-background camera-on">
        <CamPreview />
        <DisplayNameEditable />
      </div>
    );
  }

  return (
    <div className="meet-background camera-off">
      <DisplayNameEditable />
    </div>
  );
}

function CamPreview() {
  const ref = useRef();
  const track = useLocalCamTrack();

  useEffect(() => {
    if (track) {
      ref.current.srcObject = new MediaStream([track]);
    }
  }, [track]);

  return (
    <video
      id="cam-video"
      autoPlay
      playsInline
      ref={ref}
      className="meet-video"
    />
  );
}

function DisplayNameEditable() {
  const dispatch = useDispatch();
  const displayName = useSelector(({ user }) => user.displayName);
  const avatarUrl = useSelector(({ user }) => user.avatarUrl);
  const camEnable = useSelector(({ device }) => device.cam.enable);

  function changeDisplayName(e) {
    const input = e.target.value;
    if (input.length > 60) {
      message.warning("Tên hiển thị không được dài quá 60 ký tự");
      return;
    }

    if (containSpecialCharactor(input)) {
      message.warning("Tên không được chứa ký tự đặc biệt");
      return;
    }

    dispatch(actions.setDisplayName(input));
  }

  return (
    <div className={`meet-avatar-name ${camEnable && "meet-avatar-camera-on"}`}>
      <div className="meet-avatar-box">
        <div
          className="meet-avatar-image"
          style={{
            backgroundImage: `url(${avatarUrl ? avatarUrl : "/images/default_avatar.jpg"
              })`,
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div className="meet-user-name">
        <input
          type="text"
          className="w-full"
          value={displayName}
          onChange={changeDisplayName}
        />
      </div>
    </div>
  );
}

export default UserAppearencePreview;
