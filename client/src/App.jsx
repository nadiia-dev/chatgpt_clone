import { useEffect } from "react";
import Dashboard from "./components/Dashboard";
import { connection } from "./socketServer/socketConnection";

function App() {
  useEffect(() => {
    connection();
  }, []);
  return (
    <>
      <Dashboard />
    </>
  );
}

export default App;
