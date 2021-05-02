import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { SocketContext } from "./socket";

export interface Props {}

export interface IMessage {
  username: string;
  message: string;
}

const ChatRoom: React.FC<Props> = () => {
  const socket = useContext(SocketContext);
  const [username, setUsername] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [allMessages, setAllMessages] = useState<IMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    socket.on("connect", (data: IMessage) => {
      console.log("Successfully Connected to the Server");
    });

    socket.on("message", (data: IMessage) => {
      setAllMessages((messages) => [...messages, data]);
    });
  }, [socket]);

  const sendMessage = (message: string) => {
    if (message.length === 0) {
      setError("Please Enter A Valid Message");
      return;
    }
    const newMessage: IMessage = {
      username,
      message,
    };

    socket.emit("message", newMessage);
    setError(null);
    setMessage("");
  };

  const login = () => {
    if (username.length === 0) {
      setError("Please Enter a Valid Username");
      return;
    }
    setError(null);
    setLoggedIn(true);
  };

  console.log("render");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    sendMessage(message);
  };

  return (
    <div>
      <Form>
        <Container>
          {error && <Alert variant={"warning"}>{error}</Alert>}
          {loggedIn ? (
            <>
              {allMessages.map((msg, i) => (
                <Row key={i}>{`${msg.username} : ${msg.message}`}</Row>
              ))}
              <Row className="align-items-center">
                <Col>
                  <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Control
                      placeholder="Enter a Message"
                      value={message || ""}
                      onChange={(v) => setMessage(v.target.value)}
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  <Button
                    variant="primary"
                    type="Submit"
                    onClick={handleSubmit}
                  >
                    Send
                  </Button>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Form.Group>
                <Form.Label></Form.Label>
                <Form.Control
                  placeholder="Enter a username"
                  value={username || ""}
                  onChange={(v) => setUsername(v.target.value)}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              <Button variant="primary" type="Submit" onClick={login}>
                Login
              </Button>
            </>
          )}
        </Container>
      </Form>
    </div>
  );
};

export default ChatRoom;
