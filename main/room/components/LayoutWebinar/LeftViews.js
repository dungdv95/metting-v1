import RemoteView from "main/room/components/LayoutWebinar/RemoteView";
import { useSelector } from "react-redux";

function LeftViews() {
  const pined = useSelector(({ user }) => user.pined);
  const remoteviews = useSelector(({ remoteviews }) => remoteviews);

  function select() {
    if (pined) {
      if (remoteviews.length === 4 || remoteviews.length === 5) {
        return remoteviews.slice(2);
      }

      return remoteviews.slice(3);
    }

    if (remoteviews.length === 5 || remoteviews.length === 6) {
      return remoteviews.slice(3);
    }

    return remoteviews.slice(4);
  }

  if ((pined && remoteviews.length > 3) || remoteviews.length > 4) {
    return (
      <div className="spotlight-screen-left">
        <div className="spotlight-screen-right-box">
          {select().map((v) => (
            <RemoteView key={v.ownerId} {...v} />
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export default LeftViews;
