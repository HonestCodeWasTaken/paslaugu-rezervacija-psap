import { Server, type Socket } from "socket.io";

// @ts-expect-error sdf
export default function SocketHandler(req, res) {
  // It means that socket server was already initialised
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }
  const io = new Server(res.socket.server, {
    path: "/api/socket",
  });
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    console.log("Connected");
    socket.on("send-message", (obj) => {
      io.emit("receive-message", obj);
    });
  });

  console.log("Setting up socket");
  res.end();
}
