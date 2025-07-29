import Chat from "../Chat";
import Sidebar from "../Sidebar";

const Dashboard = () => {
  return (
    <div className="w-full h-screen flex flex-row">
      <Sidebar />
      <Chat />
    </div>
  );
};

export default Dashboard;
