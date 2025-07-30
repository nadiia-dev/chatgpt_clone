import { MessageSquare } from "lucide-react";

const ListItem = ({ title, conversationId, handleSetSelectedChat }) => {
  return (
    <div
      className="m-1.5 w-[240px] h-[46px] text-white flex items-center gap-2 px-3 transition duration-[0.4s] hover:opacity-50 cursor-pointer"
      onClick={() => handleSetSelectedChat(conversationId)}
    >
      <div className="text-lg">
        <MessageSquare />
      </div>
      <p className="text-sm font-medium">{title}</p>
    </div>
  );
};

export default ListItem;
