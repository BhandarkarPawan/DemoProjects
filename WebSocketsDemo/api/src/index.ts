import http from "http";
import websocket from "websocket";
import { ClientMap } from "./entities";

const port = 8000;
const server = http.createServer();
server.listen(port);
console.log(`Now listening port ${port}`);

const wsServer = new websocket.server({
  httpServer: server,
});

const clients: ClientMap = {};
const getUniqueID = () => {
  const s4 = () =>
    Math.floor((Math.random() + 1) * 0x10000)
      .toString(16)
      .substring(1);
  return s4() + s4() + "-" + s4();
};

wsServer.on("request", (req) => {
  const userId = getUniqueID();
  console.log(
    `${new Date()} Received a new connection from origin ${req.origin}`
  );

  const connection = req.accept(undefined, req.origin);
  clients[userId] = connection;
  console.log(`Connected ${userId} in ${Object.getOwnPropertyNames(clients)}`);

  connection.on("message", (message) => {
    if (message.type === "utf8")
      console.log(`Server received message: ${message}`);

    Object.entries(clients).forEach(([key, value]) => {
      value.sendUTF(message.utf8Data || "Error!");
      console.log(`Message sent to ${key}`);
    });
  });
});
