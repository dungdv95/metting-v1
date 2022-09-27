import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "main/room/store";

function useSyncLayout() {
  const dispatch = useDispatch();
  const sharingMode = useSelector(({ screensharing }) => screensharing.mode);

  useEffect(() => {
    if (sharingMode === "local" || sharingMode === "remote") {
      dispatch(actions.setLayoutSidebar());
    }
  }, [dispatch, sharingMode]);
}

export default useSyncLayout;
