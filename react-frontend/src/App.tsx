import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [latestMessage, setLatestMessage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('Connected');
      setSocket(socket);
    };

    socket.onmessage = (message) => {
      // control reaches here when the server sends the message
      console.log('received message', message.data);
      setLatestMessage(message.data);
    };

    // (cleanup) close the socket connection when not in use or if user is in different page
    return()=>{
      socket.close()
    }

  }, []);

  if (!socket) {
    return <div>Connecting to socket server...</div>;
  }

  return (
    <div>
      <input 
        onChange={(e) => {
          setMessage(e.target.value);
        }} 
      />

      <button
        onClick={() => {
          socket.send(message);
        }}
      >
        Send
      </button>

      <div>{latestMessage}</div>
    </div>
  );
}

export default App;
