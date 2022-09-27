import styles from "main/room-mobile/styles.module.css";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function SpotlightLocalCam({ localcamTrack }) {
  if (localcamTrack) {
    return <WithTrack track={localcamTrack} />;
  }

  return <WithoutTrack />;
}

function WithTrack({ track }) {
  const ref = useRef();
  const displayName = useSelector(({ user }) => user.displayName);

  useEffect(() => {
    ref.current.srcObject = new MediaStream([track]);
  }, [track]);

  return (
    <div className={`${styles.grid_block_left} ${styles.bg_black}`}>
      <video
        className={styles.main_video_left}
        ref={ref}
        autoPlay
        playsInline
      />
      <div
        className={`${styles.border_br} ${styles.item_name_user} ${styles.fs_15}`}
      >
        <span>{displayName}</span>
      </div>
    </div>
  );
}

function WithoutTrack() {
  const displayName = useSelector(({ user }) => user.displayName);

  return (
    <div className={styles.grid_block_left}>
      <div className={`${styles.border_br} ${styles.item_name_user}`}>
        <span>{displayName}</span>
      </div>
      <div className={styles.item_avatar_center}>
        <img
          className={`${styles.item_avatar_image}`}
          alt="avatar"
          src="https://smartoffice.mobifone.vn/images/avatar/1b74b6bf-7c3d-46a4-bd86-9ce82a5285df/avartar.png"
        />
      </div>
    </div>
  );
}

export default SpotlightLocalCam;
