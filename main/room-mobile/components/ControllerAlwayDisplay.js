import styles from "main/room-mobile/styles.module.css";
import { useRouter } from "next/router";
import { Grid, Button, Modal } from "antd-mobile";
import { PhoneFill } from "antd-mobile-icons";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "main/room-mobile/store";
import {
  FaVolumeDown,
  FaVolumeMute,
  FaVideoSlash,
  FaMicrophoneSlash,
  FaMicrophone,
  FaVideo,
} from "react-icons/fa";
import { TbApps, TbAppsOff } from "react-icons/tb";
import { AiOutlineWarning } from "react-icons/ai";

function ControllerAlwayDisplay() {
  const dispatch = useDispatch();

  const micEnable = useSelector(({ device }) => device.mic.enable);
  const camEnable = useSelector(({ device }) => device.cam.enable);
  const showViewList = useSelector(({ layout }) => layout.showRemoteviewList);

  function toggleMic() {
    dispatch(actions.setMicEnable(!micEnable));
  }

  function toggleCam() {
    dispatch(actions.setCamEnable(!camEnable));
  }

  function toggleViewList() {
    dispatch(actions.setShowRemoteviewList(!showViewList));
  }

  return (
    <div className={styles.back_color_footer}>
      <div className={`${styles.h_40} ${styles.content_footer_box}`}>
        <Grid columns={100} className={styles.grid_footer}>
          <Grid.Item span={20} className={styles.grid_item_custom}>
            <LeaveRoomButton />
          </Grid.Item>
          <Grid.Item span={20} className={styles.grid_item_custom}>
            <MicButton enable={micEnable} onClick={toggleMic} />
          </Grid.Item>
          <Grid.Item span={20} className={styles.grid_item_custom}>
            <CamButton enable={camEnable} onClick={toggleCam} />
          </Grid.Item>
          <Grid.Item span={20} className={styles.grid_item_custom}>
            <SoundButton />
          </Grid.Item>
          <Grid.Item span={20} className={styles.grid_item_custom}>
            <ToggleViewButton enable={showViewList} onClick={toggleViewList} />
          </Grid.Item>
        </Grid>
      </div>
    </div>
  );
}

function LeaveRoomButton() {
  const router = useRouter();
  const backUrl = useSelector(({ room }) => room.backUrl);

  function leave() {
    Modal.show({
      content: "Bạn có chắc muốn rời phòng ?",
      closeOnAction: true,
      actions: [
        {
          key: "confirm",
          text: "Đồng ý",
        },
        {
          key: "reject",
          text: "Từ chối",
          primary: true,
        },
      ],
      onAction(action) {
        if (action.key === "confirm") {
          router.push(backUrl, undefined, { sallow: true });
        }
      },
    });
  }

  return (
    <Button fill="solid" color="danger" className="px-2 py-3" onClick={leave}>
      <PhoneFill fontSize={25} className={styles.icon_phone_custom} />
    </Button>
  );
}

function MicButton({ enable, onClick }) {
  if (enable) {
    return <FaMicrophone size={28} onClick={onClick} />;
  }
  return <FaMicrophoneSlash size={30} onClick={onClick} />;
}

function SoundButton({ enable, onClick }) {
  if (enable) {
    return <FaVolumeDown size={30} onClick={onClick} />;
  }
  return <FaVolumeMute size={30} onClick={onClick} />;
}

function CamButton({ enable, onClick }) {
  if (enable) {
    return <FaVideo size={30} onClick={onClick} />;
  }
  return <FaVideoSlash size={30} onClick={onClick} />;
}

function ToggleViewButton({ enable, onClick }) {
  if (enable) {
    return <TbApps size={30} onClick={onClick} />;
  }
  return <TbAppsOff size={30} onClick={onClick} />;
}

export default ControllerAlwayDisplay;
