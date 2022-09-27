import { useEffect, useRef, useState } from "react";
import { FloatingPanel } from "antd-mobile";
import ControllerAlwayDisplay from "main/room-mobile/components/ControllerAlwayDisplay";
import ControllerMoreOptions from "main/room-mobile/components/ControllerMoreOptions";

import styles from "main/room-mobile/styles.module.css";

function Controller() {
  const ref = useRef();
  const [anchors, setAnchors] = useState([73]);

  useEffect(() => {
    setAnchors([73, 73 + ref?.current?.offsetHeight]);
  }, [ref]);

  return (
    <FloatingPanel
      anchors={anchors}
      className={`${styles.panel_custom} header_panel_custom`}
    >
      <ControllerAlwayDisplay />
      <div className={styles.popup_custom_content} ref={ref}>
        <ControllerMoreOptions />
      </div>
    </FloatingPanel>
  );
}

export default Controller;
