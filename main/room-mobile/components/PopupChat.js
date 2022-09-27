import styles from "main/room-mobile/styles.module.css";
import { Popup, Grid, Divider, SearchBar, Button } from "antd-mobile";
import { CloseOutline, FillinOutline, SmileFill } from "antd-mobile-icons";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "main/room-mobile/store";
import Messages from "main/room-mobile/components/SidebarChat/Messages"
function PopupChat() {
  const dispatch = useDispatch();
  const visible = useSelector(({ layout }) => layout.showChat);

  const [chatContent, setChatContent] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const handleChatContent = (e) => {
    setChatContent(e);
  };
  const addEmoji = (e) => {
    setChatContent((prev) => prev + e.native);
  };
  const handleShowEmoji = () => {
    setShowEmoji(!showEmoji);
  };
  return (
    <Popup
      visible={visible}
      onMaskClick={() => {
        dispatch(actions.setShowChat(false))
      }}
      position="right"
      bodyStyle={{ width: "100vw", backgroundColor: "var(--bs-dark)" }}
      className={styles.popup_chat}
    >
      <div className={styles.header_chat}>
        <Grid columns={20}>
          <Grid.Item span={18}>
            <span style={{ fontSize: "18px" }}>Chat</span>
          </Grid.Item>
          <Grid.Item
            span={2}
            className={`${styles.grid_item_custom} absolute right-5 top-5`}
          >
            <CloseOutline
              onClick={() => {
                dispatch(actions.setShowChat(false))
              }}
              fontSize={22}
            />
          </Grid.Item>
        </Grid>
      </div>
      <Divider />
      <Messages />
      {/* <div className={styles.middle_chat}>
        <div className={styles.middle_chat_content}>
          <div className={styles.middle_chat_box}>
            <FillinOutline fontSize={30} color="#757476" />
            <p className={styles.middle_text}>
              No messages yet,
              <br />
              start the conversation!
            </p>
          </div>
        </div>
      </div> */}
      <div className={styles.bottom_chat}>
        <Grid columns={100} className={styles.grid_text}>
          <Grid.Item span={82} className={styles.bottom_chat_content}>
            <SearchBar
              value={chatContent}
              icon={
                <SmileFill
                  onClick={handleShowEmoji}
                  fontSize={20}
                  className={styles.emoji_icon_flex}
                />
              }
              placeholder="Type your message..."
              clearable={false}
              onChange={(e) => {
                handleChatContent(e);
              }}
              className={styles.input_chat_custom}
            />
          </Grid.Item>
          <Grid.Item span={18} className={styles.bottom_chat_content}>
            <Button
              size="small"
              color="primary"
              className={styles.btn_send_custom}
            >
              Send
            </Button>
          </Grid.Item>
        </Grid>
      </div>
      {showEmoji && (
        <span className={styles.emoji_custom}>
          <Picker
            data={data}
            onEmojiSelect={addEmoji}
            emojiButtonSize={25}
            emojiSize={13}
          />
        </span>
      )}
    </Popup>
  );
}
export default PopupChat;
