function SpotlightEmpty() {
  return (
    <div className="spotlight-screen-center">
      <img src="/svgs/bgmeeting.svg" alt="" />
      <div className="tag-name">
        <div className="tag-name-left">
          <i className="far fa-microphone" />
        </div>
        <div className="tag-name-right">
          <div className="tag-right-top">
            <h3 className="mb-0">Chưa có điểm cầu khả dụng</h3>
          </div>
          <div className="tag-right-bottom">
            <div className="tag-box-1" />
            <div className="tag-box-2" />
            <div className="tag-box-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpotlightEmpty;
