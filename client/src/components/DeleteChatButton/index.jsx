import { Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteConversations } from "../../redux/dashboard/slice";
import { deleteChats } from "../../socketServer/socketConnection";

const DeleteChatButton = () => {
  const dispatch = useDispatch();
  const handleDeleteChat = () => {
    dispatch(deleteConversations());
    deleteChats();
  };

  return (
    <div
      className="mt-auto m-1.5 w-[240px] h-[46px] text-white flex items-center gap-2 px-3 transition duration-[0.4s] hover:opacity-50 cursor-pointer"
      onClick={handleDeleteChat}
    >
      <div className="text-lg">
        <Trash />
      </div>
      <p className="text-sm font-medium">Delete conversations</p>
    </div>
  );
};

export default DeleteChatButton;
