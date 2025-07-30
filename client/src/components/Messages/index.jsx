import { useEffect, useRef } from "react";
import Message from "../Message";
import { useSelector } from "react-redux";

const Messages = () => {
  const { selectedConversationId, conversations } = useSelector(
    (state) => state.dashboard
  );

  const scrollRef = useRef();

  const conversation = conversations.find(
    (c) => c.id === selectedConversationId
  );

  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({ behaviur: "smooth" });
  };

  useEffect(scrollToBottom, [conversation?.messages]);

  return (
    <div className="w-full h-full flex flex-col">
      {conversation &&
        conversation.messages.map((m, index) => (
          <Message
            key={m.id}
            content={m.content}
            aiMessage={m.aiMessage}
            animate={index === conversation.messages.length - 1 && m.aiMessage}
          />
        ))}
      <div ref={scrollRef} />
    </div>
  );
};

export default Messages;
