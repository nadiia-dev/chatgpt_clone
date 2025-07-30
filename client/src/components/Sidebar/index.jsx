import { useDispatch, useSelector } from "react-redux";
import DeleteChatButton from "../DeleteChatButton";
import ListItem from "../ListItem";
import NewChatButton from "../NewChatButton";
import { setSelectedConversation } from "../../redux/dashboard/slice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.dashboard.conversations);
  console.log(conversations);

  const handleSelectChat = (id) => {
    dispatch(setSelectedConversation(id));
  };
  return (
    <div className="min-w-[250px] h-full bg-stone-800 flex flex-col">
      <NewChatButton handleSelectChat={handleSelectChat} />
      {conversations &&
        conversations.map((c) => (
          <ListItem key={c.id} title={c.messages[0].content} chatId={c.id} />
        ))}
      <DeleteChatButton />
    </div>
  );
};

export default Sidebar;
