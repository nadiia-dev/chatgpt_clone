import { Plus } from "lucide-react";

const NewChatButton = () => {
  return (
    <div className="m-1.5 w-[240px] h-[46px] border border-stone-300 rounded-md text-white bg-stone-800 flex items-center gap-2 px-3 transition duration-[0.4s] hover:opacity-50 cursor-pointer">
      <div className="text-lg">
        <Plus />
      </div>
      <div className="text-sm font-medium">Add new chat</div>
    </div>
  );
};

export default NewChatButton;
