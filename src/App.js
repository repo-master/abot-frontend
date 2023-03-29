
import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import logo from './logo.svg';

import ResponsiveAppBar from './components/ResponsiveAppBar';
import { UserSessionContext, UserSessionProvider } from './UserSession';

//Pages
import LandingPage from './pages/landing';
import ChatPage from './pages/chat';

import io from 'socket.io-client';

/* Chat */
import ChatWidget from './components/ChatWidget';
import { SocketIOChatConnection, RESTChatConnection } from './api/chat-rasa';

//Connect to chat socket server endpoint
//const socket = io("ws://localhost:8080/");
//const chat_handler = new SocketIOChatConnection(socket);
const chat_handler = new RESTChatConnection("http://localhost:8000/chat");


function SampleApp() {
  const [sessionData, setSessionData, updateUserData] = useContext(UserSessionContext);

  const createGuestSession = () =>
    updateUserData({
      user_name: "guest",
      user_id: uuidv4(),
      session_id: uuidv4()
    });

  useEffect(() => {
    if (!sessionData || sessionData.session_id === undefined) {
      createGuestSession();
    }
  }, [sessionData]);

  return (
    <div className='app' >
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
    </div>
  );
}

function App() {
  return (
      <UserSessionProvider>
        <BrowserRouter>
          <Routes>
            <Route path={"/*"} element={<SampleApp />} />
          </Routes>
        </BrowserRouter>
      </UserSessionProvider>
  );
}

export default App;