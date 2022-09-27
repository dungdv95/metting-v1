import { IconHand } from "main/room/components/icons";
import { useJanusInstance } from "main/room/hooks";
import { useSelector } from "react-redux";

function RaiseHandButton() {
  const janus = useJanusInstance();
  const displayName = useSelector(({ user }) => user.displayName);
  const avatarUrl = useSelector(({ user }) => user.avatarUrl);

  function raiseHand() {
    janus.sendMessage({
      senderDisplayName: displayName,
      avatarUrl,
      content: "Tôi muốn phát biểu!",
    });
  }

  return (
    <div className="btn-hand cursor-pointer" onClick={raiseHand}>
      <img src="/emoji/raised-hand_270b.png" alt="" className="rounded-lg w-4/5" />
    </div>
  );
}

export default RaiseHandButton;
