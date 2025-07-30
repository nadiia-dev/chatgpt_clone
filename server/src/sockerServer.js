import { Server } from "socket.io";
import { v4 as uuid } from "uuid";

let sessions = {};

export const registerSockerServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Connected socket id: ${socket.id}`);

    socket.on("sendMessage", (data) => {
      newMessageHandler(socket, data);
    });

    socket.on("sessionDetails", (data) => {
      sessionHistoryHandler(socket, data);
    });
  });
};

const newMessageHandler = (socket, data) => {
  console.log("new message", data);
};

const sessionHistoryHandler = (socket, data) => {
  const { sessionId } = data;

  if (sessions[sessionId]) {
    socket.emit("sessionDetails", {
      sessionId,
      conversations: sessions[sessionId],
    });
  } else {
    const newSessionId = uuid();
    sessions[newSessionId] = [];

    const sessionDetails = {
      sessionId: newSessionId,
      conversations: [],
    };

    socket.emit("sessionDetails", sessionDetails);
  }
};
