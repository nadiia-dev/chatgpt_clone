import { io } from "socket.io-client";

let socket;

export const connection = () => {
  socket = io("http://localhost:3000");

  socket.on("connect", () => {
    console.log("cONNECTED");
    console.log(socket.id);
  });
};
