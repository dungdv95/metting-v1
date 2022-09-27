import { Divider, Grid, Popup, Switch } from "antd-mobile";
import styles from "main/room-mobile/styles.module.css";
import { CloseOutline, CheckOutline } from "antd-mobile-icons";
import { useState } from "react";

function PopupSetting({ ...props }) {
  const { visibleSetting, setVisibleSetting } = props;
  const [roomName, setRoomName] = useState("Demo");
  const [allowJoin, setAllowJoin] = useState(false);
  const [userJoin, setUserJoin] = useState(false);

  const handleChangeRoomName = (e) => {
    setRoomName(e.target.value);
  };

  const handleAllow = (e) => {
    setAllowJoin(e);
  };

  return (
    <Popup
      visible={visibleSetting}
      position="right"
      bodyStyle={{ width: "100vw", backgroundColor: "var(--bs-dark)" }}
      className={styles.popup_chat}
    >
      <div className={styles.header_people}>
        <Grid columns={20}>
          <Grid.Item span={18}>
            <span className={styles.filter_text}>Setting</span>
          </Grid.Item>
          <Grid.Item span={2} className={`${styles.grid_item_custom}`}>
            <CloseOutline
              onClick={() => {
                setVisibleSetting(false);
              }}
              fontSize={22}
            />
          </Grid.Item>
        </Grid>
      </div>
      <Divider className={styles.divider_custom} />
      <div className={styles.middle_chat}>
        <Grid columns={100} className={styles.mr_bot}>
          <Grid.Item span={35} className={styles.name_room_custom}>
            <span>Tên phòng họp : </span>
          </Grid.Item>
          <Grid.Item span={65}>
            <div className={styles.bottom_box_chat}>
              <input
                type="text"
                className={styles.custom_inp_room}
                value={roomName}
                onChange={(e) => {
                  handleChangeRoomName(e);
                }}
              />
            </div>
          </Grid.Item>
        </Grid>
        <Grid columns={100} className={styles.mr_bot}>
          <Grid.Item span={35} className={styles.name_room_custom}>
            <Switch
              checked={allowJoin}
              onChange={handleAllow}
              className={styles.switch_size}
              checkedText={<CheckOutline fontSize={15} />}
              uncheckedText={<CloseOutline fontSize={15} />}
            />
          </Grid.Item>
          <Grid.Item span={65}>
            <span>Cho phép người ngoài vào họp</span>
          </Grid.Item>
        </Grid>
        <Grid columns={100}>
          <Grid.Item span={35} className={styles.name_room_custom}>
            <Switch
              checked={userJoin}
              onChange={(e) => setUserJoin(e)}
              className={styles.switch_size}
              checkedText={<CheckOutline fontSize={15} />}
              uncheckedText={<CloseOutline fontSize={15} />}
            />
          </Grid.Item>
          <Grid.Item span={65}>
            <span>Hiển thị người tham gia</span>
          </Grid.Item>
        </Grid>
      </div>
    </Popup>
  );
}
export default PopupSetting;
