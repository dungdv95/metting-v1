import styles from "main/room-mobile/styles.module.css";
import { AudioMutedOutline } from "antd-mobile-icons";
import { useMediasoupTrack } from "main/room-mobile/hooks";
import { useEffect, useRef } from "react";

function Remoteview({ displayName, micEnable, consumerInfo }) {
  if (consumerInfo) {
    return (
      <WithConsumer
        consumerInfo={consumerInfo}
        displayName={displayName}
        micEnable={micEnable}
      />
    );
  }

  return <WithoutTrack displayName={displayName} micEnable={micEnable} />;
}

function WithConsumer({ displayName, micEnable, consumerInfo }) {
  const track = useMediasoupTrack(consumerInfo);

  if (track) {
    return <WithTrack track={track} displayName={displayName} />;
  }

  return <WithoutTrack displayName={displayName} micEnable={micEnable} />;
}

function WithTrack({ track, micEnable, displayName }) {
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
        <span>{displayName}</span>
      </div>
    </div>
  );
}

function WithoutTrack({ displayName, micEnable }) {
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

export default Remoteview;
