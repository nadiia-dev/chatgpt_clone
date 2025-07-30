import { io } from "socket.io-client";
import { store } from "../redux/store";
import { setConversations } from "../redux/dashboard/slice";

let socket;

export const connection = () => {
  socket = io("http://localhost:3000");

  socket.on("connect", () => {
    console.log("cONNECTED");
    console.log(socket.id);

    socket.emit("sessionHistory", {
      sessionId: localStorage.getItem("sessionId"),
    });

    socket.on("sessionDetails", (data) => {
      const { sessionId, conversations } = data;

      localStorage.setItem("sessionId", sessionId);
      store.dispatch(setConversations(conversations));
    });
  });
};

export const sendMessage = (message, conversationId) => {
  socket.emit("sendMessage", {
    message,
    conversationId,
  });
};
