import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Spotlight from "main/room/components/LayoutSidebar/Spotlight";
import LocalCamView from "main/room/components/LayoutSidebar/LocalCamView";
import RemoteView from "main/room/components/LayoutSidebar/RemoteView";
import PageController from "main/room/components/LayoutSidebar/PageController";

const VIDEO_RATIO = 16 / 9;
const MARGIN = 5;

function CalculatedView({ localcamTrack, localshareStream }) {
  const ncells = useSelector(({ layout }) => layout.sidebar.pageSize + 1);
  const remoteviews = useSelector((state) => state.remoteviews);
  const [ref, { containerWidth, containerHeight }] = useDimensions();
  const connections = useSelector((state) => state.connections);

  const { pageSize } = useSelector(({ layout }) => layout.sidebar);
  const pageCount = Math.ceil(connections.length / (pageSize + 1));
  const controllerHeightPage = pageCount > 1 ? 25 : 0

  let spotlightWidth = containerWidth / (1 + 1 / ncells);
  let spotlightHeight = spotlightWidth / VIDEO_RATIO;

  if (spotlightHeight + controllerHeightPage > containerHeight) {
    spotlightHeight = containerHeight - controllerHeightPage;
    spotlightWidth = VIDEO_RATIO * spotlightHeight;
  }

  const cellHeight = (spotlightHeight - MARGIN * (ncells - 1)) / ncells;
  const cellWidth = VIDEO_RATIO * cellHeight;
  const spotlightTop = (containerHeight - spotlightHeight - controllerHeightPage) / 2 + MARGIN;
  const spotlightLeft = (containerWidth - spotlightWidth - cellWidth) / 2;

  return (
    <div ref={ref} className="meeting-box">
      <Spotlight
        localcamTrack={localcamTrack}
        localshareStream={localshareStream}
        top={spotlightTop}
        left={spotlightLeft}
        width={spotlightWidth}
        height={spotlightHeight}
      />

      {Array(remoteviews.length + 1)
        .fill(0)
        .map((_, i) => {
          const top = spotlightTop + i * (cellHeight + MARGIN);
          const left = spotlightLeft + spotlightWidth + MARGIN

          if (i === 0) {
            return (
              <LocalCamView
                key="layout-siderbar-localcam-cell"
                width={cellWidth}
                height={cellHeight}
                top={top}
                left={left}
                track={localcamTrack}
              />
            );
          }

          const v = remoteviews[i - 1];
          return (
            <RemoteView
              key={`remote-cell-${v.ownerId}`}
              width={cellWidth}
              height={cellHeight}
              top={top}
              left={left}
              track={localcamTrack}
              {...v}
            />
          );
        })}
      <PageController
        top={spotlightTop + 4 * (cellHeight + MARGIN)}
        left={spotlightLeft + spotlightWidth + MARGIN}
        width={cellWidth}
        height={controllerHeightPage} />
    </div>
  );
}

function useDimensions() {
  const ref = useRef();
  const sidebarVisible = useSelector(({ layout }) => layout.sidebarVisible);
  const [dimensions, setDimensions] = useState({
    containerWidth: 0,
    containerHeight: 0,
  });

  function updateDimensions() {
    setDimensions({
      containerWidth: ref.current.offsetWidth - 2 * MARGIN,
      containerHeight: ref.current.offsetHeight - 2 * MARGIN,
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

export default CalculatedView;
