import { Badge, Grid } from "antd-mobile";
import styles from "main/room-mobile/styles.module.css";
import {
  FaUsers,
  FaLaptop,
  FaInfoCircle,
  FaCog,
  FaHandPaper,
} from "react-icons/fa";

import { BsChatTextFill } from "react-icons/bs";
import { useDispatch } from "react-redux";

import { actions } from "main/room-mobile/store";

function ControllerMoreOptions() {
  const dispatch = useDispatch();

  function showConnectionList() {
    dispatch(actions.setShowConnectionList(true));
  }
  function showChat() {
    dispatch(actions.setShowChat(true))
  }

  return (
    <>
      <Grid columns={60} className={styles.grid_custom_more}>
        <Grid.Item span={20} className={styles.block_set_custom}>
          <div onClick={showChat}>
            <div className={styles.content_item}>
              <Badge content="3">
                <BsChatTextFill size={30} />
              </Badge>
            </div>
            <div style={{ textAlign: "center" }}>
              <span>Tin nhắn</span>
            </div>
          </div>
        </Grid.Item>
        <Grid.Item span={20} className={styles.block_set_custom}>
          <div className={styles.content_item}>
            <div className={styles.icon_more_custom}>
              <FaLaptop size={30} />
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <span>Chia sẻ màn hình</span>
          </div>
        </Grid.Item>
        <Grid.Item span={20} className={styles.block_set_custom}>
          <div onClick={showConnectionList}>
            <div className={styles.content_item}>
              <Badge content="1">
                <FaUsers size={30} />
              </Badge>
            </div>
            <div style={{ textAlign: "center" }}>
              <span>Người tham dự</span>
            </div>
          </div>
        </Grid.Item>
      </Grid>
      <Grid columns={60} className={styles.grid_custom}>
        <Grid.Item span={20} className={styles.block_set_custom}>
          <div className={styles.content_item}>
            <div className={styles.icon_more_custom}>
              <FaInfoCircle size={30} />
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <span>Thông tin cuộc họp</span>
          </div>
        </Grid.Item>
        <Grid.Item span={20} className={styles.block_set_custom}>
          <div className={styles.content_item}>
            <div className={styles.icon_more_custom}>
              <FaCog size={30} />
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <span>Cài đặt</span>
          </div>
        </Grid.Item>
        <Grid.Item span={20} className={styles.block_set_custom}>
          <div className={styles.content_item}>
            <div className={styles.icon_more_custom}>
              <FaHandPaper size={30} />
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <span>Xin phát biểu</span>
          </div>
        </Grid.Item>
      </Grid>
    </>
  );
}

export default ControllerMoreOptions;
