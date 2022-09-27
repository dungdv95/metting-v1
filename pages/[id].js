import dynamic from "next/dynamic";
import jwt from "jsonwebtoken";
import { getSelectorsByUserAgent } from "react-device-detect";

const RoomDesktop = dynamic(() => import("main/room"));
const RoomMobile = dynamic(() => import("main/room-mobile"));

export async function getServerSideProps(ctx) {
  const secret =
    "102ACE2B462DAEE7B5BADA636CE60A77B6E6B46F52D9A0B189CC8E2A5159DCB6";
  try {
    const data = jwt.verify(ctx.query.jwt, secret);

    const { isMobile } = getSelectorsByUserAgent(ctx.req.headers["user-agent"]);

    return {
      props: { data: { ...data, jwt: ctx.query.jwt }, isMobile },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/unauthorized",
      },
    };
  }
}

function Room({ data, isMobile }) {
  if (isMobile) {
    return <RoomMobile data={data} />;
  }
  return <RoomDesktop data={data} />;
}

export default Room;
