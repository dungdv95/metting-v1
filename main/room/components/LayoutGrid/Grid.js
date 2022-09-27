import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import LocalCam from "main/room/components/LayoutGrid/LocalCam";
import RemoteView from "main/room/components/LayoutGrid/RemoteView";
import PageController from "main/room/components/LayoutGrid/PageController";
import LocalScreenShare from "main/room/components/LayoutGrid/LocalScreenShare";
import RemoteScreenShare from "main/room/components/LayoutGrid/RemoteScreenShare";

const VIDEO_RATIO = 16 / 9;
const MARGIN = 5;

function Grid({ shareMode, remoteviews, localcamTrack, localshareStream }) {
  const [ref, { width, height }] = useDimensions();

  const ncells = remoteviews.length + 1;

  const cellWidth = calculateCellWidth({
    containerWidth: width,
    containerHeight: height,
    ncells,
  });

  const cellHeight = cellWidth / VIDEO_RATIO;
  const nrows = Math.floor(height / cellHeight);
  const ncols = Math.ceil(ncells / nrows);
  const firstLeft = (width - ncols * cellWidth) / 2;
  const firstTop = (height - nrows * cellHeight) / 2;

  function renderRemoteViews() {
    if (width === 0 || height === 0) {
      return null;
    }

    return Array(ncells)
      .fill(0)
      .map((_, i) => {
        const row = Math.floor(i / ncols);
        const col = i % ncols;
        const top = firstTop + row * MARGIN + row * cellHeight;

        let left = firstLeft;

        if (row === nrows - 1 && ncells % ncols !== 0) {
          left = (width - (ncells % ncols) * cellWidth) / 2;
        }

        left = left + col * MARGIN + col * cellWidth;

        if (i === 0) {
          return (
            <LocalCam
              key="local-cam"
              top={top}
              left={left}
              width={cellWidth}
              height={cellHeight}
              localcamTrack={localcamTrack}
            />
          );
        }

        const index = i - 1;
        return (
          <RemoteView
            key={`grid-remoteview-${remoteviews[index].ownerId}`}
            top={top}
            left={left}
            width={cellWidth}
            height={cellHeight}
            {...remoteviews[index]}
          />
        );
      });
  }

  return (
    <div ref={ref} className="meeting-box">
      {renderRemoteViews()}
      <PageController />
    </div>
  );
}

function calculateCellWidth({ containerWidth, containerHeight, ncells }) {
  function area(increment) {
    let i = 0;
    let w = 0;
    let h = increment / VIDEO_RATIO + 2 * MARGIN;

    while (i < ncells) {
      if (w + increment > containerWidth) {
        w = 0;
        h = h + increment / VIDEO_RATIO + 2 * MARGIN;
      }
      w = w + increment + 2 * MARGIN;
      i++;
    }

    if (h > containerHeight || increment > containerWidth) {
      return true;
    }

    return false;
  }

  let tryWidth = 1;

  while (tryWidth < 5000) {
    if (area(tryWidth)) {
      return tryWidth - 1;
    }
    tryWidth++;
  }
}

function useDimensions() {
  const ref = useRef();
  const sidebarVisible = useSelector(({ layout }) => layout.sidebarVisible);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  function updateDimensions() {
    setDimensions({
      width: ref.current.offsetWidth - 2 * MARGIN,
      height: ref.current.offsetHeight - 2 * MARGIN,
    });
  }

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(updateDimensions, []);

  useEffect(updateDimensions, [sidebarVisible]);

  return [ref, dimensions];
}

export default Grid;
