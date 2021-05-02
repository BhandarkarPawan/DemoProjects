import React from "react";
import socketio from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

export const socket = socketio.connect(SOCKET_URL);
export const SocketContext = React.createContext<SocketIOClient.Socket>(socket);
