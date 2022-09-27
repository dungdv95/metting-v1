import styles from "main/room-mobile/styles.module.css";
import { Fragment, useEffect, useRef } from "react";
import { AudioMutedOutline } from "antd-mobile-icons";
import { useSelector } from "react-redux";

function RightContent({ track }) {
  const toggleCamera = useSelector(({ layout }) => layout.cameraVisible);
  if (track && toggleCamera) {
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
    <Fragment>
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
      <div className={`${styles.grid_block_right} ${styles.bg_black}`}>
        <div className={styles.title_user_right}>
          <AudioMutedOutline
            fontSize={12}
            className={`${styles.icon_custom} ${styles.icon_board_custom}`}
          />
          <span>Trần Tiến Đạt-PBIGDATA-TTCNTT</span>
        </div>
        <img
          className={`${styles.item_avatar_image} ${styles.cam_phone_fake}`}
          alt="avatar"
          src="https://i.pinimg.com/736x/68/ca/8a/68ca8ae3d26f3a02513665a46f7225b3.jpg"
        />
      </div>
      <div className={styles.grid_block_right}>
        <div className={styles.title_user_right}>
          <AudioMutedOutline
            fontSize={12}
            className={`${styles.icon_custom} ${styles.icon_board_custom}`}
          />
          <span>Trần Tiến Đạt-PBIGDATA-TTCNTT</span>
        </div>
        <div className={styles.img_avatar}>
          <img
            className={styles.item_avatar_image}
            alt="avatar"
            src="https://smartoffice.mobifone.vn/images/avatar/1b74b6bf-7c3d-46a4-bd86-9ce82a5285df/avartar.png"
          />
        </div>
      </div>
      <div className={styles.grid_block_right}>
        <div className={styles.title_user_right}>
          <AudioMutedOutline
            fontSize={12}
            className={`${styles.icon_custom} ${styles.icon_board_custom}`}
          />
          <span>Trần Tiến Đạt-PBIGDATA-TTCNTT</span>
        </div>
        <div className={styles.img_avatar}>
          <img
            className={styles.item_avatar_image}
            alt="avatar"
            src="https://smartoffice.mobifone.vn/images/avatar/1b74b6bf-7c3d-46a4-bd86-9ce82a5285df/avartar.png"
          />
        </div>
      </div>
    </Fragment>
  );
}

function WithoutTrack() {
  return (
    <Fragment>
      <div className={styles.grid_block_right}>
        <div className={`${styles.title_user_right}`}>
          <AudioMutedOutline
            fontSize={12}
            className={`${styles.icon_custom} ${styles.icon_board_custom}`}
          />
          <span>Trần Tiến Đạt-PBIGDATA-TTCNTT</span>
        </div>
        <div className={styles.img_avatar}>
          <img
            className={styles.item_avatar_image}
            alt="avatar"
            src="https://smartoffice.mobifone.vn/images/avatar/1b74b6bf-7c3d-46a4-bd86-9ce82a5285df/avartar.png"
          />
        </div>
      </div>
      <div className={styles.grid_block_right}>
        <div className={styles.title_user_right}>
          <AudioMutedOutline
            fontSize={12}
            className={`${styles.icon_custom} ${styles.icon_board_custom}`}
          />
          <span>Trần Tiến Đạt-PBIGDATA-TTCNTT</span>
        </div>
        <div className={styles.img_avatar}>
          <img
            className={styles.item_avatar_image}
            alt="avatar"
            src="https://smartoffice.mobifone.vn/images/avatar/1b74b6bf-7c3d-46a4-bd86-9ce82a5285df/avartar.png"
          />
        </div>
      </div>
      <div className={styles.grid_block_right}>
        <div className={styles.title_user_right}>
          <AudioMutedOutline
            fontSize={12}
            className={`${styles.icon_custom} ${styles.icon_board_custom}`}
          />
          <span>Trần Tiến Đạt-PBIGDATA-TTCNTT</span>
        </div>
        <div className={styles.img_avatar}>
          <img
            className={styles.item_avatar_image}
            alt="avatar"
            src="https://smartoffice.mobifone.vn/images/avatar/1b74b6bf-7c3d-46a4-bd86-9ce82a5285df/avartar.png"
          />
        </div>
      </div>
      <div className={styles.grid_block_right}>
        <div className={styles.title_user_right}>
          <AudioMutedOutline
            fontSize={12}
            className={`${styles.icon_custom} ${styles.icon_board_custom}`}
          />
          <span>Trần Tiến Đạt-PBIGDATA-TTCNTT</span>
        </div>
        <div className={styles.img_avatar}>
          <img
            className={styles.item_avatar_image}
            alt="avatar"
            src="https://smartoffice.mobifone.vn/images/avatar/1b74b6bf-7c3d-46a4-bd86-9ce82a5285df/avartar.png"
          />
        </div>
      </div>
    </Fragment>
  );
}
export default RightContent;
