
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import logo from './logo.svg';

import { ClientSessionProvider } from './ClientSessionContext';
import { AuthContextProvider } from './AuthContext';

/* Components */
import ResponsiveAppBar from './components/ResponsiveAppBar';

/* Pages */
import LandingPage from './pages/landing';
import ChatPage from './pages/chat';

/* APIs */
import io from 'socket.io-client';

/* Chat */
import ChatWidget from './components/ChatWidget';
import { SocketIOChatConnection, RESTChatConnection } from './api/chat-rasa';

//Connect to chat socket server endpoint
//const socket = io("ws://localhost:8080/");
//const chat_handler = new SocketIOChatConnection(socket);
const chat_handler = new RESTChatConnection();


function SampleApp() {
  return (
    <div className='app' >
      <AuthContextProvider>
        <ResponsiveAppBar />

        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route exact path='/chat' element={<ChatPage />} />
        </Routes>

        <ChatWidget
          title={"Abot"}
          chatConnection={chat_handler}
          profileAvatar={logo}
          />
      </AuthContextProvider>
    </div>
  );
}

function App() {
  return (
      <ClientSessionProvider>
        <BrowserRouter>
          <Routes>
            <Route path={"/*"} element={<SampleApp />} />
          </Routes>
        </BrowserRouter>
      </ClientSessionProvider>
  );
}

export default App;