import { useSelector } from "react-redux";
import { IconLoadingCamera } from "main/room/components/icons";

function Loading() {
  const loading = useSelector(({ device }) => device.bgSetting.loading);

  return (
    loading && (
      <div className="loading-backgroud">
        <IconLoadingCamera />
      </div>
    )
  );
}

export default Loading;
