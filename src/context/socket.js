import socketio from "socket.io-client";
import { SOCKET_URL } from "../config";
import { createContext } from "react";

export const socket = socketio.connect(SOCKET_URL);
export const SocketContext = createContext();