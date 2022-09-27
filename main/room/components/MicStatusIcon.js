import { BsMicMute, BsMic } from "react-icons/bs";

function MicStatusIcon({ enable, size = 16 }) {
  if (enable) {
    return <BsMic size={size} color="green" className="mr-1" />;
  }

  return <BsMicMute size={size} color="red" className="mr-1" />;
}

export default MicStatusIcon;
