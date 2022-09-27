import { useEffect } from "react";

function useRequestMediaPermissions() {
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        stream.getTracks().forEach((t) => t.stop());
      })
      .catch((error) => console.log("get video stream error:", error));
  }, []);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        stream.getTracks().forEach((t) => t.stop());
      })
      .catch((error) => console.log("get audio stream error:", error));
  }, []);
}

export default useRequestMediaPermissions;
