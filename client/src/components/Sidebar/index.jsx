import { useDispatch, useSelector } from "react-redux";
import DeleteChatButton from "../DeleteChatButton";
import ListItem from "../ListItem";
import NewChatButton from "../NewChatButton";
import { setSelectedConversation } from "../../redux/dashboard/slice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.dashboard.conversations);

  const handleSelectChat = (id) => {
    dispatch(setSelectedConversation(id));
  };
  return (
    <div className="min-w-[250px] h-full bg-stone-800 flex flex-col">
      <NewChatButton handleSelectChat={handleSelectChat} />
      {conversations &&
        conversations.map((c) => (
          <ListItem
            key={c.id}
            title={c.messages[0].content}
            conversationId={c.id}
            handleSetSelectedChat={handleSelectChat}
          />
        ))}
      <DeleteChatButton />
    </div>
  );
};

export default Sidebar;
