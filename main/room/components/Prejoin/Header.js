import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { FaAngleDoubleLeft } from "react-icons/fa";

function Header() {
  const router = useRouter();
  const avatarUrl = useSelector(({ user }) => user.avatarUrl);
  const backUrl = useSelector(({ room }) => room.backUrl);

  function back() {
    router.push(backUrl);
  }

  return (
    <div className="meet-header">
      <div className="meet-back" onClick={back}>
        <FaAngleDoubleLeft color="white" />
      </div>
      <div className="meet-right">
        <div className="meet-avater">
          <img
            src={avatarUrl ? avatarUrl : "/images/default_avatar.jpg"}
            alt=""
            className="h-10 w-10 rounded-full object-fill"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
