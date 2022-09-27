import { useEffect } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "main/room/store";

function PageController() {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);
  const { page, pageSize } = useSelector(({ layout }) => layout.grid);
  const pageCount = Math.ceil((connections.length - 1) / pageSize);

  useEffect(() => {
    if (pageCount > 0 && page > pageCount) {
      dispatch(actions.setPageLayoutGrid(page - 1));
    }
  }, [page, pageCount, dispatch]);

  function goPrevPage() {
    dispatch(actions.prevPageLayoutGrid());
  }

  function goNextPage() {
    dispatch(actions.nextPageLayoutGrid());
  }

  return (
    <>
      {page > 1 && (
        <div className="absolute inset-y-0 left-0 flex items-center cursor-pointer">
          <AiFillCaretLeft
            className="text-green-200"
            size={40}
            onClick={goPrevPage}
          />
        </div>
      )}

      {page < pageCount && (
        <div className="absolute inset-y-0 right-0 flex items-center cursor-pointer">
          <AiFillCaretRight
            className="text-green-200"
            size={40}
            onClick={goNextPage}
          />
        </div>
      )}
    </>
  );
}

export default PageController;
