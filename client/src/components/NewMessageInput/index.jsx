import { Send } from "lucide-react";

const NewMessageInput = () => {
  return (
    <div className="w-full flex items-center justify-center relative mb-3">
      <input
        placeholder="Send a message..."
        className="w-[650px] border border-stone-300 rounded-md h-[40px] outline-none text-sm px-3 pr-10 transition duration-300 focus:shadow-md focus:shadow-stone-400/40"
      />
      <div className="absolute right-[calc(50%-325px+10px)] cursor-pointer text-stone-500 hover:text-white transition">
        <Send className="w-4 h-4" />
      </div>
    </div>
  );
};

export default NewMessageInput;
