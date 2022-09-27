import { Modal } from "antd";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "main/room/store";
import { usePollingConsumerStat } from "main/room/hooks";

function ViewInfo() {
  const dispatch = useDispatch();
  const visible = useSelector(({ viewinfo }) => viewinfo.visible);
  const resolution = useSelector(({ viewinfo }) => viewinfo.resolution);
  const consumerId = useSelector(({ viewinfo }) => viewinfo.consumerId);
  const displayName = useSelector(({ viewinfo }) => viewinfo.displayName);
  const roomId = useSelector(({ room }) => room.id);
  const connId = useSelector(({ room }) => room.socketio.connectionId);

  const stat = usePollingConsumerStat({
    roomId,
    connId,
    consumerId,
    stop: !visible,
  });

  const props = {
    visible,
    className: "modal-user-info",
    title: "Thông tin điểm cầu",
    closable: true,
    closeIcon: <FaTimes className="text-white" />,
    onCancel() {
      dispatch(actions.hideViewInfo());
    },
    footer: null,
  };

  return (
    <Modal {...props}>
      <div className="popup-user-info">
        <div className="popup-user-item">
          <div className="popup-user-item-left">Tên:</div>
          <div className="popup-user-item-right">{displayName}</div>
        </div>

        <>
          <div className="popup-user-item">
            <div className="popup-user-item-left">Bitrate :</div>
            <div className="popup-user-item-right">
              {stat ? `${numberWithCommas(stat.bitrate)} (bit/s)` : "NaN"}
            </div>
          </div>
          <div className="popup-user-item">
            <div className="popup-user-item-left">Packets Lost:</div>
            <div className="popup-user-item-right">
              {stat ? `${stat.packetsLost} ` : "NaN"}
            </div>
          </div>

          <div className="popup-user-item">
            <div className="popup-user-item-left">Độ phân giải:</div>
            <div className="popup-user-item-right">
              {resolution && resolution.width
                ? `${resolution.width} x ${resolution.height}`
                : "NaN"}
            </div>
          </div>
        </>
      </div>
    </Modal>
  );
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default ViewInfo;
