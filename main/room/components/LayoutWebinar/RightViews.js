import { useSelector } from "react-redux";
import RemoteView from "main/room/components/LayoutWebinar/RemoteView";
import LocalView from "main/room/components/LayoutWebinar/LocalView";

function RightViews({ localcamTrack }) {
  const pined = useSelector(({ user }) => user.pined);
  const remoteviews = useSelector(({ remoteviews }) => remoteviews);

  function select() {
    if (pined) {
      if (remoteviews.length < 4) {
        return remoteviews;
      }

      if (remoteviews.length === 4 || remoteviews.length === 5) {
        return remoteviews.slice(0, 2);
      }

      return remoteviews.slice(0, 3);
    }

    if (remoteviews.length <= 4) {
      return remoteviews;
    }

    if (remoteviews.length === 5 || remoteviews.length === 6) {
      return remoteviews.slice(0, 3);
    }

    return remoteviews.slice(0, 4);
  }

  if (pined || remoteviews.length > 0) {
    return (
      <div className="spotlight-screen-right">
        <div className="spotlight-screen-right-box">
          {pined && <LocalView track={localcamTrack} />}
          {select().map((v) => (
            <RemoteView key={v.ownerId} {...v} />
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export default RightViews;
