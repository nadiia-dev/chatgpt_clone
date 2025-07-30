import DeleteChatButton from "../DeleteChatButton";
import ListItem from "../ListItem";
import NewChatButton from "../NewChatButton";

const Sidebar = () => {
  return (
    <div className="min-w-[250px] h-full bg-stone-800 flex flex-col">
      <NewChatButton />
      <ListItem />
      <DeleteChatButton />
    </div>
  );
};

export default Sidebar;
