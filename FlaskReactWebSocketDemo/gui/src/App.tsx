import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { SocketContext, socket } from "./socket";
import ChatRoom from "./ChatRoom";

export interface Props {}

export interface IMessage {
  username: string;
  message: string;
}

const App: React.FC<Props> = () => {
  return (
    <SocketContext.Provider value={socket}>
      <ChatRoom />
    </SocketContext.Provider>
  );
};

export default App;
