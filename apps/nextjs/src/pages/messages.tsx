import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import io from "socket.io-client";

export const socket = io({
  path: "/api/socket",
  closeOnBeforeunload: false,
});

interface messageObject {
  username: string;
  message: string;
}

const Home = () => {
  const effectRan = useRef(false);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [allMessages, setAllMessages] = useState<messageObject[]>([]);
  const session = useSession();
  console.log(session.data?.user.id);
  useEffect(() => {
    // useEffect mounting/dismounting fix..
    if (effectRan.current === false) {
      socketInitializer();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  function socketInitializer() {
    socket.on("receive-message", (data: messageObject) => {
      console.log("received..");
      setAllMessages((pre) => [...pre, data]);
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("emitted");
    socket.emit("send-message", {
      username,
      message,
    });
    setMessage("");
  }

  return (
    <div>
      <h1>Chat app</h1>
      <h1>Enter a username</h1>
      <input
        className="border shadow-lg"
        placeholder="enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <br />
      <div>
        {allMessages.map((username, index) => (
          <div key={index}>
            {username.username}: {username.message}
          </div>
        ))}
        <br />
        <form onSubmit={handleSubmit}>
          <input
            className="border"
            name="message"
            placeholder="enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete={"off"}
          />
        </form>
        click enter to submit
      </div>
    </div>
  );
};

export default Home;
