import { Send } from "lucide-react";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  setSelectedConversation,
} from "../../redux/dashboard/slice";
import { sendMessage } from "../../socketServer/socketConnection";

const NewMessageInput = () => {
  const [content, setContent] = useState("");

  const selectedConversationId = useSelector(
    (state) => state.dashboard.selectedConversationId
  );
  const dispatch = useDispatch();

  const conversations = useSelector((state) => state.dashboard.conversations);

  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId
  );

  const proceedMessage = () => {
    const message = { aiMessage: false, content, id: uuid(), animate: false };
    let conversationId = selectedConversationId;

    if (selectedConversationId === "new") {
      conversationId = uuid();
      dispatch(addMessage({ conversationId, message }));
      dispatch(setSelectedConversation(conversationId));
    } else {
      dispatch(addMessage({ conversationId, message }));
    }

    sendMessage({ message, conversationId });
    setContent("");
  };
  const handleNewMessage = () => {
    if (content.length > 0) {
      proceedMessage();
    }
  };

  const handleKeyPressed = (e) => {
    if (e.code === "Enter" && content.length > 0) {
      proceedMessage();
    }
  };
  return (
    <div className="w-full flex items-center justify-center relative mb-3">
      <input
        placeholder="Send a message..."
        className="w-[650px] border border-stone-300 rounded-md h-[40px] outline-none text-sm px-3 pr-10 transition duration-300 focus:shadow-md focus:shadow-stone-400/40"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyPressed}
        disabled={
          selectedConversation &&
          !selectedConversation.messages[
            selectedConversation.messages.length - 1
          ].aiMessage
        }
      />
      <div
        className="absolute right-[calc(50%-325px+10px)] cursor-pointer text-stone-500 hover:text-white transition"
        onClick={handleNewMessage}
      >
        <Send className="w-4 h-4" />
      </div>
    </div>
  );
};

export default NewMessageInput;
