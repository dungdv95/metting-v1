import { useState } from "react";
import { Grid } from "antd-mobile";
import styles from "main/room-mobile/styles.module.css";
import { useInterval } from "main/room/hooks";
import { toHHMMSS } from "main/room/utils";
import { MdFlipCameraAndroid } from "react-icons/md";
import { useSelector } from "react-redux";

function RoomInsideHeader() {
  const roomId = useSelector(({ room }) => room.id);
  const show = useSelector(({ layout }) => layout.showRoomInsideHeader);

  if (show) {
    return (
      <div className={styles.back_color}>
        <div
          className={`${styles.content_footer_box} ${styles.content_header}`}
        >
          <Grid columns={100} className={styles.grid_header}>
            <Grid.Item span={80} className={styles.grid_header_text}>
              <h3 className={`${styles.mr_unset} ${styles.cl_white}`}>
                <span>Demo</span>
              </h3>
              <div className={styles.header_box}>
                <h5 className={styles.header_box_id}>ID : {roomId}</h5>
                <span className={styles.devider}></span>
                <div className={styles.header_box_time}>
                  <RoomLifespan />
                </div>
              </div>
            </Grid.Item>
            <Grid.Item span={20} className={styles.grid_header_cam}>
              <div className={styles.cam_custom}>
                <MdFlipCameraAndroid size={20} />
              </div>
            </Grid.Item>
          </Grid>
        </div>
      </div>
    );
  }

  return null;
}

function RoomLifespan() {
  const createdAt = useSelector(({ room }) => new Date(room.createdAt));
  const diff = Math.floor(Math.abs((new Date() - createdAt) / 1000));
  const [elapsed, setElapsed] = useState(diff);

  useInterval(() => {
    const diff = Math.floor(Math.abs((new Date() - createdAt) / 1000));
    setElapsed(diff);
  }, 1000);

  return toHHMMSS(elapsed);
}

export default RoomInsideHeader;
