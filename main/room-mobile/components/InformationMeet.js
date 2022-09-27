import { Grid, Modal, Ellipsis } from "antd-mobile";
import styles from "main/room-mobile/styles.module.css";
import { LinkOutline } from "antd-mobile-icons";
import { Fragment } from "react";

const linkUrl = "https://smartoffice.mobifone.vn/meeting/694285244";

function InformationMeet({ ...props }) {
  const { visibleInfo, setVisibleInfo } = props;
  const hanldeClose = () => {
    setVisibleInfo(false);
  };
  return (
    <Modal
      title={modalHeader("Thông tin cuộc họp")}
      visible={visibleInfo}
      content={modalBody()}
      closeOnAction={true}
      closeOnMaskClick={true}
      showCloseButton
      onClose={hanldeClose}
      className={styles.custom_modal}
      bodyClassName={styles.custom_modal_body}
    />
  );
}

const modalHeader = (header) => {
  return <span style={{ color: "#fff" }}>{header}</span>;
};

const modalBody = () => {
  return (
    <Fragment>
      <div className={styles.content_line_space}>
        <Grid columns={100} className={styles.grid_custom}>
          <Grid.Item span={50}>Tên cuộc họp</Grid.Item>
          <Grid.Item span={50}>TT CNTT 1</Grid.Item>
        </Grid>
        <Grid columns={100} className={styles.grid_custom}>
          <Grid.Item span={50}>Tham dự cuộc họp qua link</Grid.Item>
          <Grid.Item span={50} className={styles.grid_item_info}>
            <LinkOutline fontSize={20} style={{ paddingRight: "5px" }} />
            <Ellipsis
              className={styles.text_custom}
              direction="end"
              content={linkUrl}
            />
          </Grid.Item>
        </Grid>
        <Grid columns={100} className={styles.grid_custom}>
          <Grid.Item span={50}>Mã</Grid.Item>
          <Grid.Item span={50}>694285244</Grid.Item>
        </Grid>
        <Grid columns={100} className={styles.grid_custom}>
          <Grid.Item span={100}>
            <LinkOutline fontSize={20} style={{ paddingRight: "5px", display: 'inline-block' }} />
            <span>Copy</span>
          </Grid.Item>
        </Grid>
      </div>
    </Fragment>
  );
};
export default InformationMeet;
