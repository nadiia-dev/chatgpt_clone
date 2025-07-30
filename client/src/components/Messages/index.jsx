import Message from "../Message";

const Messages = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <Message aiMessage content={"hello"} animate />
      <Message content={"hello"} />
    </div>
  );
};

export default Messages;
