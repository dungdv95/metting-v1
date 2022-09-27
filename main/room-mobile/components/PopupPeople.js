import { useState } from "react";
import {
  Popup,
  Grid,
  Divider,
  Button,
  Modal,
  List,
  SwipeAction,
  Image,
} from "antd-mobile";
import styles from "main/room-mobile/styles.module.css";
import {
  CloseOutline,
  SearchOutline,
  VideoOutline,
  AudioOutline,
} from "antd-mobile-icons";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "main/room-mobile/store";

function PopupPeople() {
  const dispatch = useDispatch();
  const visible = useSelector(({ layout }) => layout.showConnectionList);

  function hide() {
    dispatch(actions.setShowConnectionList(false));
  }

  return (
    <Popup
      visible={visible}
      onMaskClick={hide}
      position="left"
      bodyStyle={{ width: "100vw", backgroundColor: "var(--bs-dark)" }}
      className={styles.popup_chat}
    >
      <Header hide={hide} />
      <Filter />
      <ConnectionList />
    </Popup>
  );
}

function Header({ hide }) {
  return (
    <>
      <div className={styles.header_people}>
        <Grid columns={20}>
          <Grid.Item span={17}>
            <span className={styles.filter_text}>Người tham dự</span>
          </Grid.Item>
          <Grid.Item span={3} className={`${styles.grid_item_custom}`}>
            <CloseOutline onClick={hide} fontSize={22} />
          </Grid.Item>
        </Grid>
      </div>
      <Divider className={styles.divider_custom} />
    </>
  );
}

function Filter() {
  const connectionCount = useSelector((state) => state.connections.length);
  const [searchUser, setSearchUser] = useState("");
  const [typyFilter, setTypeFilter] = useState("all");
  const [textType, setTextType] = useState("Tất cả");

  const handleSearchUser = (e) => {
    setSearchUser(e.target.value);
  };

  const handleSelect = (action) => {
    setTextType(getTextType(action.key));
    setTypeFilter(action.key);
  };

  return (
    <>
      <Grid columns={10} className={`${styles.mr_bot} ${styles.mr_left}`}>
        <Grid.Item span={6}>
          <div className={styles.bottom_box_chat}>
            <SearchOutline
              fontSize={25}
              className={`${styles.emoji_icon} ${styles.icon_search}`}
            />
            <input
              type="text"
              placeholder="Search for users"
              className={`${styles.inp_search} ${styles.custom_inp}`}
              value={searchUser}
              onChange={(e) => {
                handleSearchUser(e);
              }}
            />
          </div>
        </Grid.Item>
        <Grid.Item span={4}>
          <div className={styles.bottom_box_chat}>
            <div className={`${styles.custom_inp} ${styles.custom_badge}`}>
              <Button
                className={styles.filter_user}
                onClick={() => {
                  Modal.show({
                    content: "Lựa chọn tìm kiếm",
                    closeOnAction: true,
                    closeOnMaskClick: true,
                    onAction: handleSelect,
                    actions: [
                      {
                        key: "all",
                        text: "Tất cả",
                        primary: getType(typyFilter, "all"),
                      },
                      {
                        key: "cam_on",
                        text: "Đang bật cam",
                        primary: getType(typyFilter, "cam_on"),
                      },
                      {
                        key: "cam_off",
                        text: "Đang tắt cam",
                        primary: getType(typyFilter, "cam_off"),
                      },
                      {
                        key: "mic_on",
                        text: "Đang bật mic",
                        primary: getType(typyFilter, "mic_on"),
                      },
                      {
                        key: "mic_off",
                        text: "Đang tắt mic",
                        primary: getType(typyFilter, "mic_off"),
                      },
                      {
                        key: "share_screen",
                        text: "Đang chia sẻ màn hình",
                        primary: getType(typyFilter, "share_screen"),
                      },
                    ],
                  });
                }}
              >
                <div className={styles.badge_custom}>
                  <div className={styles.badge_custom_content}>
                    {connectionCount}
                  </div>
                </div>
                <span className={styles.filter_text}>{textType}</span>
              </Button>
            </div>
          </div>
        </Grid.Item>
      </Grid>
    </>
  );
}

function ConnectionList() {
  const connections = useSelector((state) => state.connections);

  return (
    <List className={styles.list_custom}>
      {connections.map((c) => (
        <Connection key={c.id} {...c} />
      ))}
    </List>
  );
}

function Connection({ displayName, avatarUrl, micEnable, camEnable }) {
  const actions = [
    {
      key: "rename",
      text: "Thay đổi tên",
      color: "primary",
    },
    {
      key: "out",
      text: "Mời ra khỏi phòng",
      color: "danger",
    },
  ];

  return (
    <SwipeAction rightActions={actions} className="bg-[#212529]">
      <List.Item
        prefix={
          <Image
            src={avatarUrl}
            fit="cover"
            width={40}
            height={40}
            className="rounded-full"
            alt=""
          />
        }
        extra={
          <>
            <VideoOutline fontSize={24} className={styles.icon_space} />
            <AudioOutline fontSize={24} />
          </>
        }
        description="Mobifone-IT"
        className={styles.list_item_custom}
      >
        {displayName}
      </List.Item>
    </SwipeAction>
  );
}

const getTextType = (typyFilter) => {
  switch (typyFilter) {
    case "all":
      return "Tất cả";
    case "cam_on":
      return "Bật cam";
    case "cam_off":
      return "Tắt cam";
    case "mic_on":
      return "Bật mic";
    case "mic_off":
      return "Tắt mic";
    case "share_screen":
      return "Chia sẻ";
    default:
      return "";
  }
};

const getType = (typyFilter, key) => {
  if (typyFilter === key) {
    return true;
  } else {
    return false;
  }
};

export default PopupPeople;
