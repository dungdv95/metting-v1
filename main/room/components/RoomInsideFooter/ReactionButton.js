import { useJanusInstance, useDebounceCallback } from "main/room/hooks";
import { useSelector, useDispatch } from "react-redux";
import { Popover } from "antd";
import { emoji } from "configs";
import { actions } from "main/room/store";
import { useState, useRef } from "react";
function ReactionButton() {
  const dispatch = useDispatch();
  const janus = useJanusInstance();
  const displayName = useSelector(({ user }) => user.displayName);
  const avatarUrl = useSelector(({ user }) => user.avatarUrl);
  const reactions = useSelector(({ message }) => message.reactions);
  const currentReaction = useSelector(({ message }) => message.currentReaction);
  const ioConnectionId = useSelector(({ room }) => room.socketio.connectionId);
  const [
    visibleOptionSetting,
    setVisibleOptionSetting,
  ] = useState(false);
  const currentStatus = useRef(true)
  const handleVisibleOptionChange = value => {
    currentStatus.current = true
    if (value == true) {
      setTimeout(() => {
        if (currentStatus.current == true) {
          setVisibleOptionSetting(value);
        }
      }, 400)
    }
    if (value == false && currentStatus.current == true) {
      setVisibleOptionSetting(value);
    }
  };

  function reaction(current) {
    const d = new Date();
    const id = `${ioConnectionId}-${d.getTime()}`;
    const style = Math.floor(Math.random() * 10 + 1);
    dispatch(actions.setCurrentReaction({ content: current, style, id }));
    setTimeout(() => {
      dispatch(actions.removeReaction());
    }, 2500);
    sendReaction(current, id);
  }

  const sendReaction = useDebounceCallback((current, id) => {
    janus.sendMessage({
      senderDisplayName: displayName,
      avatarUrl,
      content: `[@reaction]${current}`,
      id: id,
    });
  }, 500);

  const moreMenu = (
    <div className="setting-image">
      {emoji.map((img) => (
        <div
          key={img}
          className="setting-image-item "
          onClick={() => {

            reaction(img);
          }}
        >
          <img src={img} alt="" className="rounded-lg" />
        </div>
      ))}
    </div>
  );
  return (
    <Popover
      overlayClassName="custom-popover-emoji"
      placement="top"
      content={moreMenu}
      visible={visibleOptionSetting}
      onVisibleChange={handleVisibleOptionChange}

    >
      <div
        className="btn-smile cursor-pointer"
        onClick={() => {
          currentStatus.current = false
          setVisibleOptionSetting(false)
          reaction(currentReaction);
        }}
      >
        <img src={currentReaction} alt="" className="rounded-lg" />
        {reactions.map((x) => {
          return (
            <ReactionDisplay key={x.id} content={x.content} style={x.style} />
          );
        })}
      </div>
    </Popover>
  );
}

function ReactionDisplay({ content, style }) {
  return (
    <div className="app-room-reactions">
      <div className="live-emotes">
        <div className={`live-emote-container  live-emote-container-${style}`}>
          <div className="live-emote">
            <div className="live-emote-content emoji-content ">
              <img src={content} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReactionButton;
