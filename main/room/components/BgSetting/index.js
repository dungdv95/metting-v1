import dynamic from "next/dynamic";
import { Modal } from "antd";
import { IconResize, IconTraffic } from "main/room/components/icons";
import { useDispatch, useSelector } from "react-redux";
import { bgImages } from "configs";
import { actions } from "main/room/store";
import { FaTimesCircle } from "react-icons/fa";

const BackgroundPreview = dynamic(
  () => import("main/room/components/BgSetting/BackgroundPreview"),
  { ssr: false }
);

function BgSetting() {
  const dispatch = useDispatch();
  const visible = useSelector(({ device }) => device.bgSetting.visible);
  const bg = useSelector(({ device }) => device.bgSetting.current);
  const options = useSelector(({ device }) => device.bgSetting.options);

  function changeBg(name) {
    dispatch(actions.setBackgroundSetting(name));
  }

  function showInputFile() {
    dispatch(actions.showImportBG());
  }

  function hide() {
    dispatch(actions.hideBgSetting());
  }

  function classname(variant = "") {
    if (variant === "off") {
      return bg === "off"
        ? "setting-image-item image-none active"
        : "setting-image-item image-none";
    }

    if (variant === "slight-blur") {
      return bg == "slight-blur"
        ? "setting-image-item item-slight-blur active"
        : "setting-image-item item-slight-blur";
    }

    if (variant === "blur") {
      return bg == "blur" ? "setting-image-item active" : "setting-image-item";
    }

    for (const img of options) {
      if (variant === img) {
        return bg == img
          ? "setting-image-item active"
          : "setting-image-item image-user-upload";
      }
    }

    for (const img of bgImages) {
      if (variant === img) {
        return bg == img ? "setting-image-item active" : "setting-image-item";
      }
    }
  }

  const props = {
    visible: true,
    title: "Cài đặt hình nền",
    className: "popup-background",
    closable: false,
    onCancel() {
      dispatch(actions.hideBgSetting());
    },
    footer: [
      <AppyButton key="ok" />,
      <button key="cancel" className="btn-cancle" onClick={hide}>
        Hủy
      </button>,
    ],
  };

  if (visible) {
    return (
      <Modal {...props}>
        <div className="setting-top">
          <div className="setting-title">
            <IconResize />
            <span>Preview</span>
          </div>
          <BackgroundPreview />
        </div>
        <div className="setting-bottom">
          <div className="setting-image">
            <div className={classname("off")} onClick={() => changeBg("off")}>
              <IconTraffic />
              <h3 className="mb-0">None</h3>
            </div>
            <div className={classname("slight-blur")} onClick={showInputFile}>
              <div className="image-slight-blur" />
              <h5>Import</h5>
            </div>
            <div className={classname("blur")} onClick={() => changeBg("blur")}>
              <div className="image-blur" />
              <h5>Blur</h5>
            </div>
            {options.map((img) => (
              <div key={img} className={classname(img)}>
                <img
                  src={img}
                  alt=""
                  className="rounded-lg"
                  onClick={() => changeBg(img)}
                />
                {bg !== img && (
                  <i
                    onClick={() => {
                      let check = options.findIndex((x) => x == img);
                      var arr = options;
                      arr = [...arr.slice(0, check), ...arr.slice(check + 1)];
                      dispatch(actions.importBackgroundSetting(arr));
                    }}
                  >
                    <FaTimesCircle />
                  </i>
                )}
              </div>
            ))}
            {bgImages.map((img) => (
              <div key={img} className={classname(img)}>
                <img
                  src={img}
                  alt=""
                  className="rounded-lg"
                  onClick={() => changeBg(img)}
                />
              </div>
            ))}
          </div>
        </div>
      </Modal>
    );
  }

  return null;
}

function AppyButton() {
  const dispatch = useDispatch();
  const bg = useSelector(({ device }) => device.bgSetting.current);
  const loading = useSelector(({ device }) => device.bgSetting.loading);

  function apply() {
    dispatch(actions.setBackground(bg));
  }

  return (
    <button disabled={loading} className="btn-apply" onClick={apply}>
      Áp dụng
    </button>
  );
}

export default BgSetting;
