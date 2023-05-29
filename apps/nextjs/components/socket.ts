import { io } from "socket.io-client";

// socket for client side - nodejs server communication
const socket = io("http://localhost:3001");

export default socket;
