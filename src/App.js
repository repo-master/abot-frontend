
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import logo from './logo.svg';

import { UserSessionProvider } from './UserSession';
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
const chat_handler = new RESTChatConnection("http://localhost:8000/chat");


function SampleApp() {
  //const [sessionData, setSessionData, updateUserData] = useContext(UserSessionContext);

  // const createGuestSession = () =>
  //   updateUserData({
  //     auth_token: null,
  //     user_id: "guest"
  //   });

  // useEffect(() => {
  //   if (!sessionData || sessionData.auth_token === undefined) {
  //     createGuestSession();
  //   }
  // }, [sessionData]);

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