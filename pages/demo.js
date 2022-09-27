import { useEffect } from "react";

function DemoPage() {
  useEffect(() => {
    const ctx = new AudioContext();
    const destNode = ctx.createMediaStreamDestination();
    console.log(destNode.stream.getAudioTracks());
  }, []);
  return <div>demo</div>;
}

export default DemoPage;
