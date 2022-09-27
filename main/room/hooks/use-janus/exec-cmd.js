function execCmd(transport, cmd) {
  return new Promise((resolve, reject) => {
    const tx = makeTx();

    function listener(event) {
      const { transaction, data, error, janus } = JSON.parse(event.data);

      if (janus === "timeout") {
        transport.removeEventListener("message", listener);
        reject("timeout");
        return;
      }

      if (transaction === tx) {
        transport.removeEventListener("message", listener);

        if (error) {
          reject(error);
          return;
        }

        resolve(data);
        return;
      }
    }

    transport.addEventListener("message", listener);

    transport.send(JSON.stringify({ ...cmd, transaction: tx }));
  });
}

function makeTx(length = 16) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export { execCmd };
