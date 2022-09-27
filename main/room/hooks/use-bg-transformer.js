import { useCallback, useEffect, useMemo, useRef } from "react";
import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";
import { useDispatch } from "react-redux";
import { actions } from "main/room/store";
import message from "main/room/components/message";

function useBackgroundTransformer() {
  const canvas = useRef(null);
  const canvasCtx = useRef(null);
  const canvas2 = useRef(null);
  const canvasCtx2 = useRef(null);
  const blur = useRef(false);
  const bgImage = useRef(new Image());
  const controller = useRef(null);
  const timestamp = useRef(null);
  const bgStop = useRef(false);
  const dispatch = useDispatch();

  const selfieSeg = useMemo(() => {
    const seg = new SelfieSegmentation({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
      },
    });
    seg.setOptions({ modelSelection: 1 });
    return seg;
  }, []);

  useEffect(() => {
    return () => {
      selfieSeg.close();
    };
  }, [selfieSeg]);

  const transform = useCallback(
    (videoTrack) => {
      let trackStop = false;

      videoTrack.onended = () => {
        trackStop = true;
      };

      const processor = new MediaStreamTrackProcessor({ track: videoTrack });
      const generator = new MediaStreamTrackGenerator({ kind: "video" });
      const { width, height } = videoTrack.getSettings();
      canvas.current = new OffscreenCanvas(width, height);
      canvas2.current = new OffscreenCanvas(width, height);
      canvasCtx.current = canvas.current.getContext("2d", { alpha: false });
      canvasCtx2.current = canvas2.current.getContext("2d", { alpha: false });
      selfieSeg.onResults(onResults);

      const transformer = new TransformStream({
        async transform(videoFrame, ctl) {
          if (trackStop) {
            videoFrame.close();
            return;
          }

          if (bgStop.current) {
            return;
          }

          controller.current = ctl;
          timestamp.current = videoFrame.timestamp;
          videoFrame.width = width;
          videoFrame.height = height;
          canvas2.current.width = width;
          canvas2.current.height = height;
          canvasCtx2.current.drawImage(videoFrame, 0, 0);
          await selfieSeg.send({ image: canvas2.current });
          videoFrame.close();
        },
      });
      processor.readable.pipeThrough(transformer).pipeTo(generator.writable);

      return generator;
    },
    [onResults, selfieSeg]
  );

  const onResults = useCallback(
    (results) => {
      try {
        canvasCtx.current.save();
        canvasCtx.current.clearRect(
          0,
          0,
          canvas.current.width,
          canvas.current.height
        );

        if (blur.current) {
          canvasCtx.current.globalCompositeOperation = "copy";
          canvasCtx.current.filter = "none";
          canvasCtx.current.filter = `blur(10px)`;
          canvasCtx.current.drawImage(
            results.segmentationMask,
            0,
            0,
            canvas.current.width,
            canvas.current.height
          );
          canvasCtx.current.globalCompositeOperation = "source-in";
          canvasCtx.current.filter = "none";
          canvasCtx.current.drawImage(
            results.image,
            0,
            0,
            canvas.current.width,
            canvas.current.height
          );
          canvasCtx.current.globalCompositeOperation = "destination-over";
          canvasCtx.current.filter = `blur(10px)`;
          canvasCtx.current.drawImage(
            results.image,
            0,
            0,
            canvas.current.width,
            canvas.current.height
          );
        } else if (bgImage.current.src) {
          canvasCtx.current.globalCompositeOperation = "copy";
          canvasCtx.current.drawImage(
            results.segmentationMask,
            0,
            0,
            canvas.current.width,
            canvas.current.height
          );
          canvasCtx.current.globalCompositeOperation = "source-out";
          canvasCtx.current.drawImage(
            bgImage.current,
            0,
            0,
            canvas.current.width,
            canvas.current.height
          );

          canvasCtx.current.globalCompositeOperation = "destination-atop";
          canvasCtx.current.drawImage(
            results.image,
            0,
            0,
            canvas.current.width,
            canvas.current.height
          );
        }
        canvasCtx.current.restore();
        controller.current.enqueue(
          new VideoFrame(canvas.current, {
            timestamp: timestamp.current,
            alpha: "discard",
            format: "BGRA",
          })
        );
      } catch (error) {
        dispatch(actions.setBackgroundSetting("off"));
        dispatch(actions.deleteImportBackgroundSetting(bgImage.current.src));
        message.error("Có lỗi sảy ra! Mời bạn chọn lại ảnh nền");
      }
    },
    [dispatch]
  );

  const configure = useCallback(({ bg }) => {
    if (bg === "blur") {
      bgStop.current = false;
      blur.current = true;
      bgImage.current.src = "";
      return;
    }

    if (bg === "off") {
      bgStop.current = true;
      return;
    }

    bgStop.current = false;
    blur.current = false;
    bgImage.current.src = bg;
  }, []);

  const transformer = useMemo(
    () => ({ transform, configure }),
    [transform, configure]
  );

  return transformer;
}

export default useBackgroundTransformer;
