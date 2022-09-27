import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";

import { actions } from "main/room/store";

function PageController({
  top, left, width, height
}) {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);
  const { page, pageSize } = useSelector(({ layout }) => layout.sidebar);
  const loading = useSelector(({ layout }) => layout.sidebar.pageLoading);
  const pageCount = Math.ceil(connections.length / (pageSize + 1));

  useEffect(() => {
    if (pageCount > 0 && page > pageCount) {
      dispatch(actions.setPageLayoutSidebar(page - 1));
    }
  }, [page, pageCount, dispatch]);

  function goPrevPage() {
    if (page > 1) {
      dispatch(actions.prevPageLayoutSidebar());
    }
  }

  function goNextPage() {
    if (page < pageCount) {
      dispatch(actions.nextPageLayoutSidebar());
    }
  }

  if (loading) {
    return null;
  }
  // text-gray-500
  if (pageCount > 1) {
    return (
      <div className="absolute flex items-center justify-center"
        style={{ top, left, width, height }}>
        <FaAngleDoubleLeft
          className={page > 1 ? "text-white w-10 cursor-pointer" :
            "text-gray-500 w-10"}
          size={18}
          onClick={goPrevPage} />
        <FaAngleDoubleRight
          className={page < pageCount ? "text-white w-10 cursor-pointer" :
            "text-gray-500 w-10"}
          size={18}
          onClick={goNextPage} />
      </div>

    );
  }

  return null;
}

export default PageController;
