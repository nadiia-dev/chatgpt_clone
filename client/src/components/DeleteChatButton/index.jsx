import { Trash } from "lucide-react";

const DeleteChatButton = () => {
  return (
    <div className="mt-auto m-1.5 w-[240px] h-[46px] text-white flex items-center gap-2 px-3 transition duration-[0.4s] hover:opacity-50 cursor-pointer">
      <div className="text-lg">
        <Trash />
      </div>
      <p className="text-sm font-medium">Delete conversations</p>
    </div>
  );
};

export default DeleteChatButton;
