import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SocketContext, socket } from "./socket";
import ChatRoom from "./ChatRoom";

const App: React.FC = () => {
  return (
    <SocketContext.Provider value={socket}>
      <ChatRoom />
    </SocketContext.Provider>
  );
};

export default App;
