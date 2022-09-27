import styles from "main/room-mobile/styles.module.css";

import { Grid } from "antd-mobile";
import { RightOutline, LeftOutline } from "antd-mobile-icons";
import { useSelector } from "react-redux";

import Spotlight from "main/room-mobile/components/Spotlight";
import Remoteview from "main/room-mobile/components/Remoteview";
import LocalView from "main/room-mobile/components/LocalView";

import { useLocalCamTrack, useSyncLocalCamTrack } from "main/room-mobile/hooks";

function Views() {
  const localcamTrack = useLocalCamTrack();
  useSyncLocalCamTrack(localcamTrack);

  return (
    <div className={styles.content_box}>
      <div className={`${styles.content_box_middle}`}>
        <Grid columns={100} className={styles.grid_custom}>
          <Grid.Item span={100} className={styles.grid_item_custom}>
            <Spotlight localcamTrack={localcamTrack} />
          </Grid.Item>
          <Remoteviews localcamTrack={localcamTrack} />
        </Grid>
      </div>
    </div>
  );
}

function Remoteviews({ localcamTrack }) {
  const page = useSelector(({ remoteview }) => remoteview.page);
  const pageSize = useSelector(({ remoteview }) => remoteview.pageSize);
  const remoteviews = useSelector(({ remoteview }) => remoteview.remoteviews);
  const show = useSelector(({ layout }) => layout.showRemoteviewList);

  function className() {
    if (show) {
      return "flex justify-center items-center overflow-auto";
    }
    return "hidden";
  }

  return (
    <Grid.Item span={100} className={className()}>
      {page > 1 && (
        <LeftOutline
          fontSize={30}
          className={`${styles.left_icon_custom} ${styles.left_custom}`}
        />
      )}
      <LocalView track={localcamTrack} />
      {remoteviews.map((v) => (
        <Remoteview key={v.ownerId} {...v} />
      ))}
      {page < pageSize && (
        <RightOutline
          fontSize={30}
          className={`${styles.left_icon_custom} ${styles.right_custom}`}
        />
      )}
    </Grid.Item>
  );
}

export default Views;
