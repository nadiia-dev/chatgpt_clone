import { useSelector } from "react-redux";
import Chat from "../Chat";
import Sidebar from "../Sidebar";
import Spinner from "../Spinner";

const Dashboard = () => {
  const sessionEstablished = useSelector(
    (state) => state.dashboard.sessionEstablished
  );
  return (
    <div className="w-full h-screen flex flex-row">
      <Sidebar />
      <Chat />
      {!sessionEstablished && <Spinner />}
    </div>
  );
};

export default Dashboard;
