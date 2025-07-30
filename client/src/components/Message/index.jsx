import { Bot, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SlowText = (props) => {
  const { speed, text } = props;
  const [placeholder, setPlaceholder] = useState(text[0]);

  const index = useRef(0);

  useEffect(() => {
    function tick() {
      index.current++;
      setPlaceholder((prev) => prev + text[index.current]);
    }
    if (index.current < text.length - 1) {
      let addChar = setInterval(tick, speed);
      return () => clearInterval(addChar);
    }
  }, [placeholder, speed, text]);

  return <span>{placeholder}</span>;
};

const Message = ({ content, aiMessage, animate }) => {
  return (
    <div
      className={`w-full flex items-start px-4 py-2 ${
        aiMessage ? "justify-start" : "justify-end"
      }`}
    >
      {aiMessage && (
        <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center mr-2 shrink-0">
          <Bot className="w-4 h-4 text-stone-700" />
        </div>
      )}

      <div
        className={`
          max-w-[75%] px-4 py-2 rounded-xl text-sm whitespace-pre-wrap leading-relaxed
          ${
            aiMessage
              ? "bg-stone-100 text-stone-900 rounded-tl-none"
              : "bg-blue-600 text-white rounded-tr-none"
          }
        `}
      >
        {animate ? <SlowText speed={20} text={content} /> : content}
      </div>

      {!aiMessage && (
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center ml-2 shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
};

export default Message;
