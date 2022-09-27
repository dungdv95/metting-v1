import styles from "main/room/styles.module.css";
import { Fragment } from "react";
function MiddleContent() {
  return (
    <div className={`${styles.screen_middle} ${styles.col_right_custom}`}>
      <div className={styles.screen_middle_container}>
        <div className={styles.item_container}>
          <div className={styles.item_name_user}>
            <span className={styles.client_name_user}>
              Trần Tiến Đạt-PBIGDATA-TTCNTT
            </span>
          </div>
          <div className={styles.item_avatar_user}>
            <div className={styles.item_avatar_center}>
              <img
                className={styles.item_avatar_image}
                alt="avatar"
                src="https://smartoffice.mobifone.vn/images/avatar/1b74b6bf-7c3d-46a4-bd86-9ce82a5285df/avartar.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MiddleContent;
