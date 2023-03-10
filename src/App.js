
import React, { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import logo from './logo.svg';

import ResponsiveAppBar from './components/ResponsiveAppBar';

/* Chat */
import ChatWidget, { addResponseMessage } from './components/ChatWidget';
import io from 'socket.io-client';

//Connect to chat socket server endpoint
const socket = io("ws://localhost:8080/");

function App() {
  //Can be used to disable the box, or show 'offline'/'online' icon (green or red dot)
  // const [isConnected, setIsConnected] = useState(socket.connected);

  const handleNewUserMessage = (newMessage) => {
    socket.send(newMessage);
    //TODO: Use Namespace
  };

  useEffect(() => {
    socket.on('message', message => {
      console.log("Received", message)
      addResponseMessage(message);
    });
  }, []);

  return (
    <div className="App">
      <ResponsiveAppBar />
      <Container maxWidth="xl">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Landing page
          </Typography>
        </Box>
      </Container>

      <ChatWidget
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={logo}
        />
    </div>
  );
}

export default App;