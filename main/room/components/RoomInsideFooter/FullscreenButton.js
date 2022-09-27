import { FaCompress } from "react-icons/fa";

function FullscreenButton() {
  function requestFullscreen() {
    if (typeof document !== "undefined") {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        return;
      }
      document.body.requestFullscreen();
    }
  }

  return (
    <div className="btn-compress cursor-pointer" onClick={requestFullscreen}>
      <FaCompress color="white" size={20} />
    </div>
  );
}

export default FullscreenButton;
