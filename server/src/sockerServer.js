import { Server } from "socket.io";

export const registerSockerServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Connected socket id: ${socket.id}`);
  });
};
