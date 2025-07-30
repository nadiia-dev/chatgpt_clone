import { Server } from "socket.io";
import { v4 as uuid } from "uuid";
import openai from "./ai.js";

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

const newMessageHandler = async (socket, data) => {
  const { sessionId, message, conversationId } = data;

  const prevMessages = [];

  if (sessions[sessionId]) {
    const existingConversation = sessions[sessionId].find(
      (c) => c.id === conversationId
    );

    if (existingConversation) {
      prevMessages.push(
        ...existingConversation.messages.map((m) => ({
          content: m.content,
          role: m.aiMessage ? "assistant" : "user",
        }))
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [...prevMessages, { role: "user", content: message.content }],
    });

    const aiMessageContent = response.choices[0].message.content;

    const aiMessage = {
      content: aiMessageContent
        ? aiMessageContent
        : "Error while trying to get response from ai",
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
