
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import abot_logo from './abot-chat-agent.png';

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
import { ChatBotWidget } from 'react-simple-chatbot';
import { SocketIOChatConnection, RESTChatConnection } from './api/chat-rasa';

/* UI */
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

//Connect to chat socket server endpoint
//const socket = io("ws://localhost:8080/");
//const chat_handler = new SocketIOChatConnection(socket);
const chat_handler = new RESTChatConnection();


function SampleApp() {
	const handleUserSend = async (message) => {
		return async function*() {
			let response_promise = await chat_handler.sendMessage(message.content);
			for (let msg of response_promise) {
				yield new Promise((res, rej) => res(msg));
			}
			// yield new Promise(r => setTimeout(() => r("Hello"), 2000));
		};
	};

	return (
		<div className='app' >
			<AuthContextProvider>
				<ThemeProvider theme={darkTheme}>
					<CssBaseline />
					<ResponsiveAppBar appTitle={"Abot"} />

					<Routes>
						<Route exact path='/' element={<LandingPage />} />
						<Route exact path='/chat' element={<ChatPage />} />
					</Routes>

					<ChatBotWidget
						headerTitle={"Abot chat"}
						placeholder={"Enter your query..."}
						botAvatar={abot_logo}
						initialMessages={[
							{
								message: 'How may I help you?'
							}
						]}
						recognitionEnable={true}
						floating={true}
						onUserSend={handleUserSend}
					/>
				</ThemeProvider>
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
