import styles from "main/room-mobile/styles.module.css";
import { AudioMutedOutline } from "antd-mobile-icons";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

function LocalView({ track }) {
  if (track) {
    return <WithTrack track={track} />;
  }

  return <WithoutTrack />;
}

function WithTrack({ track }) {
  const ref = useRef();

  useEffect(() => {
    ref.current.srcObject = new MediaStream([track]);
  }, [track]);

  return (
    <div className={`${styles.grid_block_right} ${styles.bg_black}`}>
      <video
        className={styles.main_video_right}
        ref={ref}
        autoPlay
        playsInline
      />
      <div className={`${styles.title_user_right}`}>
        <AudioMutedOutline
          fontSize={12}
          className={`${styles.icon_custom} ${styles.icon_board_custom}`}
        />
        <span>Trần Tiến Đạt-PBIGDATA-TTCNTT</span>
      </div>
    </div>
  );
}

function WithoutTrack() {
  const displayName = useSelector(({ user }) => user.displayName);

  return (
    <div className={styles.grid_block_right}>
      <div className={`${styles.title_user_right}`}>
        <AudioMutedOutline
          fontSize={12}
          className={`${styles.icon_custom} ${styles.icon_board_custom}`}
        />
        <span>{displayName}</span>
      </div>
      <div className={styles.img_avatar}>
        <img
          className={styles.item_avatar_image}
          alt="avatar"
          src="https://smartoffice.mobifone.vn/images/avatar/1b74b6bf-7c3d-46a4-bd86-9ce82a5285df/avartar.png"
        />
      </div>
    </div>
  );
}

export default LocalView;
