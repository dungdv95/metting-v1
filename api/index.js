import { apiEndpoint } from "configs";

function customFetch(input, options) {
  const jwt = localStorage.getItem("jwt");

  return fetch(input, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${jwt}`,
    },
  });
}

async function createRoomIfNotExist({ roomId, name, password } = {}) {
  const response = await customFetch(`${apiEndpoint}/rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ roomId, name, password }),
  });

  const { data, error } = await response.json();

  if (error) {
    throw new Error(error);
  }

  return {
    roomId: data.roomId,
    createdAt: data.createdAt,
    requireApproveToJoin: data.requireApproveToJoin,
  };
}

async function closeRoom({ roomId } = {}) {
  const response = await customFetch(`${apiEndpoint}/rooms/${roomId}`, {
    method: "DELETE",
  });

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}

async function getRoomRouterCapabilities({ roomId, ioConnectionId } = {}) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/conns/${ioConnectionId}/routerRtpCapabilities`
  );

  const { data, error } = await response.json();

  if (error) {
    throw new Error(error);
  }

  return data;
}

async function setSpotlight({ roomId, ioConnectionId } = {}) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/conns/${ioConnectionId}/spotlight`,
    {
      method: "PUT",
    }
  );

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}

async function unsetSpotlight({ roomId } = {}) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/spotlight`,
    {
      method: "DELETE",
    }
  );

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}

async function setDeviceCapabilities({
  roomId,
  ioConnectionId,
  rtpCapabilities,
}) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/conns/${ioConnectionId}/deviceRtpCapabilities`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rtpCapabilities),
    }
  );

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}

async function requestJoin({
  roomId,
  ioConnectionId,
  displayName,
  email,
  avatarUrl,
  isModerator,
}) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/conns/${ioConnectionId}/requestJoin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ displayName, email, avatarUrl, isModerator }),
    }
  );

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}

async function createMediasoupConsumeTransport({ roomId, ioConnectionId }) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/conns/${ioConnectionId}/consumeTransport`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { data, error } = await response.json();

  if (error) {
    throw new Error(error);
  }

  return data;
}

async function createMediasoupProduceTransport({ roomId, ioConnectionId }) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/conns/${ioConnectionId}/produceTransport`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { data, error } = await response.json();

  if (error) {
    throw new Error(error);
  }

  return data;
}

async function connectMediasoupConsumeTransport({
  roomId,
  ioConnectionId,
  dtlsParameters,
}) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/conns/${ioConnectionId}/consumeTransport/connect`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtlsParameters),
    }
  );

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}

async function connectMediasoupProduceTransport({
  roomId,
  ioConnectionId,
  dtlsParameters,
}) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/conns/${ioConnectionId}/produceTransport/connect`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtlsParameters),
    }
  );

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}

async function connectionTurnOncam({
  roomId,
  ioConnectionId,
  kind,
  rtpParameters,
}) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/conns/${ioConnectionId}/oncam`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        kind,
        rtpParameters,
      }),
    }
  );

  const { error, data } = await response.json();

  if (error) {
    throw new Error(error);
  }

  return data.producerId;
}

async function connectionStartShareScreen({
  roomId,
  ioConnectionId,
  kind,
  rtpParameters,
}) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/conns/${ioConnectionId}/startShareScreen`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        kind,
        rtpParameters,
      }),
    }
  );

  const { error, data } = await response.json();

  if (error) {
    throw new Error(error);
  }

  return data.producerId;
}

async function connectionStopShareScreen({ roomId, ioConnectionId }) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/conns/${ioConnectionId}/stopShareScreen`,
    { method: "POST" }
  );

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}

async function connectionTurnOffcam({ roomId, ioConnectionId }) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/conns/${ioConnectionId}/offcam`,
    {
      method: "POST",
    }
  );

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}

async function connectionTurnMic({ roomId, ioConnectionId, enable }) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/conns/${ioConnectionId}/turnmic`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ enable }),
    }
  );

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}

async function requestPageChange({ roomId, ioConnectionId, page, pageSize }) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/conns/${ioConnectionId}/page`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page,
        pageSize,
      }),
    }
  );

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}

async function requestShareInfo({ roomId, ioConnectionId }) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/conns/${ioConnectionId}/share`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}

async function requestCamSpotlightInfo({ roomId, ioConnectionId }) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/conns/${ioConnectionId}/camSpotlight`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}

async function resumeConsumer({ roomId, ioConnectionId, consumerId }) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/conns/${ioConnectionId}/consumers/${consumerId}/resume`,
    {
      method: "PUT",
    }
  );

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}

async function setupJanusAudioBridgeSession({ roomId } = {}) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/setupJanusAudioBridgeRoomSession`,
    {
      method: "POST",
    }
  );

  const { error, data } = await response.json();

  if (error) {
    throw new Error(error);
  }

  return data;
}

async function getAudioBridgeJoinRoomInfo({ roomId }) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/audioBridgeJoinRoomInfo`
  );

  const { error, data } = await response.json();

  if (error) {
    throw new Error(error);
  }

  return data;
}

async function getTextRoomJoinInfo({ roomId }) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/textRoomJoinInfo`
  );

  const { error, data } = await response.json();

  if (error) {
    throw new Error(error);
  }

  return data;
}

async function getConsumerStat({ roomId, connId, consumerId }) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/conns/${connId}/consumers/${consumerId}/stat`
  );

  const { error, data } = await response.json();

  if (error) {
    throw new Error(error);
  }

  return data;
}

async function forceConnectionLeaveRoom({ ioConnectionId, roomId, email }) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/conns/${ioConnectionId}/forceLeaveRoom`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    }
  );

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}

async function forceConnectionStopShare({ ioConnectionId }) {
  const response = await customFetch(
    `${apiEndpoint}/conns/${ioConnectionId}/forceStopShare`,
    { method: "PUT" }
  );

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}

async function forceConnectionTurnOffCam({ ioConnectionId }) {
  const response = await customFetch(
    `${apiEndpoint}/conns/${ioConnectionId}/forceTurnOffCam`,
    { method: "PUT" }
  );

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}

async function forceConnectionTurnOffMic({ ioConnectionId }) {
  const response = await customFetch(
    `${apiEndpoint}/conns/${ioConnectionId}/forceTurnOffMic`,
    { method: "PUT" }
  );

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}

async function pinConnection({ roomId, ioConnectionId }) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/conns/${ioConnectionId}/pin`,
    { method: "PUT" }
  );

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}

async function unpinConnection({ roomId, ioConnectionId }) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/conns/${ioConnectionId}/unpin`,
    { method: "PUT" }
  );

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}

async function requestPinedRemoteViews({ roomId, ioConnectionId }) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/conns/${ioConnectionId}/pinedRemoteViews`,
    { method: "PUT" }
  );

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}

async function setSpeakingStatusThenSetSpotlight({
  roomId,
  ioConnectionId,
  speaking,
}) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/conns/${ioConnectionId}/setSpeakingStatusThenSetSpotlight`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ speaking }),
    }
  );

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}

async function updateDisplayName({ roomId, ioConnectionId, newDisplayName }) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/conns/${ioConnectionId}/displayName`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newDisplayName }),
    }
  );

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}

async function requestUpdateScreenShareConsumer({ roomId, ioConnectionId }) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/conns/${ioConnectionId}/requestUpdateScreenShareConsumer`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}
async function getRequestJoins({ roomId }) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/requestJoins`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { error, data } = await response.json();

  if (error) {
    throw new Error(error);
  }

  return data;
}

async function setPolicyRequireApproveToJoin({ roomId, requireApproveToJoin }) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/policies/require-approve-to-join`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: requireApproveToJoin }),
    }
  );

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}

async function getRoomPolicies({ roomId }) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/policies`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { error, data } = await response.json();

  if (error) {
    throw new Error(error);
  }

  return data;
}

async function approveRequestJoin({ roomId, email, isAccept }) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/approveRequestJoin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, isAccept }),
    }
  );

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}

async function tackleRequestJoin({ roomId, moderatorId, email, approve }) {
  const response = await customFetch(
    `${apiEndpoint}/rooms/${roomId}/requestJoin`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moderatorId, email, approve }),
    }
  );

  const { error } = await response.json();

  if (error) {
    throw new Error(error);
  }
}

export default Object.freeze({
  closeRoom,
  getAudioBridgeJoinRoomInfo,
  getTextRoomJoinInfo,
  setupJanusAudioBridgeSession,
  createRoomIfNotExist,
  getRoomRouterCapabilities,
  setSpotlight,
  unsetSpotlight,
  setDeviceCapabilities,
  requestJoin,
  createMediasoupConsumeTransport,
  createMediasoupProduceTransport,
  connectMediasoupConsumeTransport,
  connectMediasoupProduceTransport,
  connectionTurnOncam,
  connectionTurnOffcam,
  connectionTurnMic,
  connectionStartShareScreen,
  connectionStopShareScreen,
  requestPageChange,
  requestShareInfo,
  resumeConsumer,
  forceConnectionLeaveRoom,
  forceConnectionStopShare,
  forceConnectionTurnOffCam,
  forceConnectionTurnOffMic,
  pinConnection,
  unpinConnection,
  requestPinedRemoteViews,
  requestCamSpotlightInfo,
  setSpeakingStatusThenSetSpotlight,
  getConsumerStat,
  updateDisplayName,
  requestUpdateScreenShareConsumer,
  setPolicyRequireApproveToJoin,
  getRoomPolicies,
  approveRequestJoin,
  getRequestJoins,
  tackleRequestJoin,
});
