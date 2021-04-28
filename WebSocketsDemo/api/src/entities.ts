import websocket from "websocket";

export interface ClientMap {
  [key: string]: websocket.connection;
}