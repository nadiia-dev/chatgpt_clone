import { Server } from "socket.io";
import { v4 as uuid } from "uuid";

let sessions = {};

export const registerSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Connected socket id: ${socket.id}`);

    socket.on("sendMessage", (data) => {
      console.log("💬 Got sendMessage from client:", data);
      newMessageHandler(socket, data);
    });

    socket.on("sessionHistory", (data) => {
      sessionHistoryHandler(socket, data);
    });

    socket.on("deleteConversations", (data) => {
      deleteConversationsHandler(socket, data);
    });
  });
};

const newMessageHandler = (socket, data) => {
  const { sessionId, message, conversationId } = data;

  const previousConversationMessages = [];

  if (sessions[sessionId]) {
    const existingConversation = sessions[sessionId].find(
      (c) => c.id === conversationId
    );

    if (existingConversation) {
      previousConversationMessages.push(
        ...existingConversation.messages.map((m) => ({
          content: m.content,
          role: m.aiMessage ? "assistant" : "user",
        }))
      );
    }

    const aiMessage = {
      content: "This is ai",
      id: uuid(),
      aiMessage: true,
    };

    const conversation = sessions[sessionId].find(
      (c) => c.id === conversationId
    );

    if (!conversation) {
      sessions[sessionId].push({
        id: conversationId,
        messages: [message, aiMessage],
      });
    }

    if (conversation) {
      conversation.messages.push(message, aiMessage);
    }

    const updatedConversation = sessions[sessionId].find(
      (c) => c.id === conversationId
    );

    socket.emit("conversationDetails", updatedConversation);
  }
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

const deleteConversationsHandler = (socket, data) => {
  const { sessionId } = data;

  if (sessions[sessionId]) {
    sessions[sessionId] = [];
  }
};
