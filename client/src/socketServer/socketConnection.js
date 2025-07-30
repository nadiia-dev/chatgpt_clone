import { io } from "socket.io-client";
import { store } from "../redux/store";
import {
  setConversations,
  updateConversationHistory,
} from "../redux/dashboard/slice";

let socket;

export const connection = () => {
  socket = io("http://localhost:3000");

  socket.on("connect", () => {
    console.log("🟢 Socket connected:", socket.id);
    socket.emit("sessionHistory", {
      sessionId: localStorage.getItem("sessionId"),
    });

    socket.on("sessionDetails", (data) => {
      const { sessionId, conversations } = data;

      localStorage.setItem("sessionId", sessionId);
      store.dispatch(setConversations(conversations));
    });

    socket.on("conversationDetails", (conversation) => {
      console.log("📬 Got conversationDetails from server!", conversation);
      store.dispatch(updateConversationHistory(conversation));
    });
  });
};

export const sendMessage = ({ message, conversationId }) => {
  if (!conversationId) {
    console.warn("conversationId is missing!");
    return;
  }

  const sessionId = localStorage.getItem("sessionId");
  console.log(message);

  socket.emit("sendMessage", {
    sessionId,
    message,
    conversationId,
  });
};

export const deleteChats = () => {
  socket.emit("deleteConversations", {
    sessionId: localStorage.getItem("sessionId"),
  });
};
