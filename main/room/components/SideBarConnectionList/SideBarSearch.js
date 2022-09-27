import { useDispatch, useSelector } from "react-redux";
import { Popover } from "antd";
import {
  FaChromecast,
  FaMicrophone,
  FaVideo,
  FaAngleDown,
  FaListUl,
  FaVideoSlash,
  FaMicrophoneSlash,
} from "react-icons/fa";
import { IconSearch } from "main/room/components/icons";
import { actions } from "main/room/store";
import { useRef, useState } from "react";

function SideBarSearch() {
  const dispatch = useDispatch();
  const mode = useSelector(({ layout }) => layout.sidebarContent.mode);
  if (mode !== "add") {
    return (
      <div className="meeting-sidebar-search meeting-search-box">
        <div className="meeting-search-left">
          <input
            type="text"
            placeholder="Tìm kiếm"
            onChange={(e) => {
              dispatch(actions.setContentSearchName(e.target.value));
            }}
          />
          <IconSearch />
        </div>
        {mode == "joined" ? <PopverFilter /> : <PopverFilterPending />}
      </div>
    );
  }
}
function PopverFilterPending() {
  const lengthFilter = useSelector(({ search }) => search.lengthFilter);
  return (
    <div className="meeting-search-right pending">
      <div className="meeting-search-right-box">
        <div className="meeting-search-video">
          <FaListUl color="#959595" />
        </div>
      </div>
      {lengthFilter == "??" ? (
        <span className="lengthPending">
          <svg
            aria-hidden="true"
            className="mr-0.5 h-5 w-5 text-gray-200 animate-spin dark:text-gray-600  animate-spin dark:text-gray-600 fill-pink-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </span>
      ) : (
        <span className="lengthPending">{lengthFilter}</span>
      )}
    </div>
  );
}
function PopverFilter() {
  const lengthFilter = useSelector(({ search }) => search.lengthFilter);
  const mode = useSelector(({ layout }) => layout.sidebarContent.mode);
  const [visibleOptionSetting, setVisibleOptionSetting] = useState(false);
  const handleVisibleOptionChange = (value) => {
    setVisibleOptionSetting(value);
  };
  const contentFilter = () => {
    if (mode == "joined") {
      return (
        <div className="content-filter">
          <FilterAll handleVisibleOptionChange={handleVisibleOptionChange} />
          <FilterCamera handleVisibleOptionChange={handleVisibleOptionChange} />
          <FilterMic handleVisibleOptionChange={handleVisibleOptionChange} />
          <FilterShare handleVisibleOptionChange={handleVisibleOptionChange} />
        </div>
      );
    } else return null;
  };

  return (
    <Popover
      overlayClassName="custom-popover-filter"
      placement="bottomRight"
      content={contentFilter}
      onVisibleChange={handleVisibleOptionChange}
      visible={visibleOptionSetting}
    >
      <div className="meeting-search-right">
        <div className="meeting-search-right-box">
          <div className="meeting-search-video">
            <IconFilter />
          </div>
        </div>
        {lengthFilter == "??" ? (
          <span>
            <svg
              aria-hidden="true"
              className="mr-0.5 h-5 w-5 text-gray-200  animate-spin dark:text-gray-600  animate-spin dark:text-gray-600 fill-pink-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <i>
              <FaAngleDown />{" "}
            </i>
          </span>
        ) : (
          <span>
            {lengthFilter}
            <i>
              <FaAngleDown />{" "}
            </i>
          </span>
        )}
      </div>
    </Popover>
  );
}

function IconFilter() {
  const checkType = useSelector(({ search }) => search.checkType);
  switch (checkType) {
    case "all":
      return <FaListUl color="#959595" />;
    case "cam-on":
      return <FaVideo color="#959595" />;
    case "cam-off":
      return <FaVideoSlash color="#959595" />;
    case "mic-on":
      return <FaMicrophone color="#959595" />;
    case "mic-off":
      return <FaMicrophoneSlash color="#959595" />;
    case "share":
      return <FaChromecast color="#959595" />;
    default:
      return null;
  }
}

function FilterAll({ handleVisibleOptionChange }) {
  const dispatch = useDispatch();
  const checkType = useSelector(({ search }) => search.checkType);

  return (
    <div className="content-filter-top">
      <div
        className={`filter-all filter-item ${
          checkType === "all" ? "active" : ""
        }`}
        onClick={() => {
          handleVisibleOptionChange(false);
          dispatch(actions.setContentSearchType("all"));
        }}
      >
        <i className="fas fa-list-ul">
          <FaListUl />
        </i>
        <span>Tất cả</span>
      </div>
    </div>
  );
}

function FilterCamera({ handleVisibleOptionChange }) {
  const dispatch = useDispatch();
  const checkType = useSelector(({ search }) => search.checkType);
  return (
    <div className="content-filter-center filter-item">
      <div
        className={`filter-camera-on  ${
          checkType === "cam-on" ? "active" : ""
        }`}
        onClick={() => {
          handleVisibleOptionChange(false);
          dispatch(actions.setContentSearchType("cam-on"));
        }}
      >
        <i className="far fa-video">
          <FaVideo />
        </i>
        <span>Đang bật cam</span>
      </div>
      <div
        className={`filter-camera-off ${
          checkType === "cam-off" ? "active" : ""
        }`}
        onClick={() => {
          handleVisibleOptionChange(false);
          dispatch(actions.setContentSearchType("cam-off"));
        }}
      >
        <i className="far fa-video-slash">
          <FaVideoSlash />
        </i>
        <span>Đang tắt cam</span>
      </div>
    </div>
  );
}

function FilterMic({ handleVisibleOptionChange }) {
  const dispatch = useDispatch();
  const checkType = useSelector(({ search }) => search.checkType);
  return (
    <div className={`content-filter-center filter-item`}>
      <div
        className={`filter-mic-on ${checkType === "mic-on" ? "active" : ""}`}
        onClick={() => {
          handleVisibleOptionChange(false);
          dispatch(actions.setContentSearchType("mic-on"));
        }}
      >
        <i className="far fa-microphone">
          <FaMicrophone />
        </i>
        <span>Đang bật mic</span>
      </div>
      <div
        className={`filter-camera-off filter-item ${
          checkType === "mic-off" ? "active" : ""
        }`}
        onClick={() => {
          handleVisibleOptionChange(false);
          dispatch(actions.setContentSearchType("mic-off"));
        }}
      >
        <i className="far fa-microphone-slash">
          <FaMicrophoneSlash />
        </i>
        <span>Đang tắt mic</span>
      </div>
    </div>
  );
}

function FilterShare({ handleVisibleOptionChange }) {
  const dispatch = useDispatch();
  const checkType = useSelector(({ search }) => search.checkType);

  return (
    <div className="content-filter-bottom">
      <div
        className={`filter-share-screen filter-item ${
          checkType === "share" ? "active" : ""
        }`}
        onClick={() => {
          handleVisibleOptionChange(false);
          dispatch(actions.setContentSearchType("share"));
        }}
      >
        <i className="fab fa-chromecast">
          {" "}
          <FaChromecast />
        </i>
        <span>Đang chia sẻ màn hình</span>
      </div>
    </div>
  );
}
export default SideBarSearch;
