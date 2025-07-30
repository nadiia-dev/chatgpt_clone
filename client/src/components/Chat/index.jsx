import Messages from "../Messages";
import NewMessageInput from "../NewMessageInput";

const ChatLogo = () => {
  return (
    <div className="grow-1 h-full flex flex-col justify-center items-center">
      <p className="text-stone-200 font-bold text-5xl">Ai Chat</p>
    </div>
  );
};

const Chat = () => {
  return (
    <div className="grow-1 h-full flex flex-col">
      {/* <ChatLogo />
       */}
      <Messages />
      <NewMessageInput />
    </div>
  );
};

export default Chat;
