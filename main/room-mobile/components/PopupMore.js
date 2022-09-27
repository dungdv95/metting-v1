import styles from "main/room/styles.module.css";
import { Popup, Grid, Badge } from "antd-mobile";
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

function PopupMore({ ...props }) {
  const { visibleMore, setVisibleMore, openChat, openInfo, openSetting } =
    props;

  const dispatch = useDispatch();

  const handleInfo = () => {
    openInfo();
    setVisibleMore(false);
  };

  function showConnectionList() {
    console.log("okokok");
    // dispatch(actions.setShowConnectionList(true));
  }

  return (
    <Popup
      visible={visibleMore}
      onMaskClick={() => {
        setVisibleMore(false);
      }}
    >
      <div className={styles.popup_custom_content}>
        <Grid columns={60} className={styles.grid_custom_more}>
          <Grid.Item
            span={20}
            className={styles.block_set_custom}
            onClick={openChat}
          >
            <div className={styles.content_item}>
              <Badge content="3">
                <BsChatTextFill size={30} />
              </Badge>
            </div>
            <div style={{ textAlign: "center" }}>
              <span>Tin nhắn</span>
            </div>
          </Grid.Item>
          <Grid.Item span={20} className={styles.block_set_custom}>
            <div className={styles.content_item}>
              <FaLaptop size={30} />
            </div>
            <div style={{ textAlign: "center" }}>
              <span>Chia sẻ màn hình</span>
            </div>
          </Grid.Item>
          <Grid.Item
            span={20}
            className={styles.block_set_custom}
            onClick={console.log}
          >
            <div className={styles.content_item}>
              <Badge content="1">
                <FaUsers size={30} />
              </Badge>
            </div>
            <div style={{ textAlign: "center" }}>
              <span>Người tham dự</span>
            </div>
          </Grid.Item>
        </Grid>
        <Grid columns={60} className={styles.grid_custom}>
          <Grid.Item
            span={20}
            className={styles.block_set_custom}
            onClick={handleInfo}
          >
            <div className={styles.content_item}>
              <FaInfoCircle size={30} />
            </div>
            <div style={{ textAlign: "center" }}>
              <span>Thông tin cuộc họp</span>
            </div>
          </Grid.Item>
          <Grid.Item
            span={20}
            className={styles.block_set_custom}
            onClick={showConnectionList}
          >
            <div className={styles.content_item}>
              <FaCog size={30} />
            </div>
            <div style={{ textAlign: "center" }}>
              <span>Càiaa ssđặt</span>
            </div>
          </Grid.Item>
          <Grid.Item span={20} className={styles.block_set_custom}>
            <div className={styles.content_item}>
              <FaHandPaper size={30} />
            </div>
            <div style={{ textAlign: "center" }}>
              <span>Xin phát biểu</span>
            </div>
          </Grid.Item>
        </Grid>
      </div>
    </Popup>
  );
}

export default PopupMore;
