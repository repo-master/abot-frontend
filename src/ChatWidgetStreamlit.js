import React, { useState } from 'react';
import { FloatButton, ChatBotContainer, Header, HeaderTitle } from './react-simple-chatbot';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';


export function ChatBotWidget(props) {
	const [opened, setOpened] = useState(false);

	const height = '520px';
	const width = '350px';

	const header = (
		<Header className="rsc-header">
			<HeaderTitle className="rsc-header-title">
				<Box
					component="img"
					sx={{
						height: 24,
						width: 24,
						maxHeight: { xs: 32, md: 32 },
						maxWidth: { xs: 32, md: 32 },
					}}
					alt="Abot"
					src="/abot-chat.png"
				/>
				{"Abot chat"}
			</HeaderTitle>

			<IconButton onClick={() => setOpened(false)}><CloseIcon /></IconButton>
		</Header>
	);

	return (
		<div>
			<FloatButton
				className="rsc-float-button"
				style={{}}
				opened={opened}
				onClick={() => setOpened(true)}>
				{<ChatIcon />}
			</FloatButton>

			<ChatBotContainer
				className="rsc-container"
				floating={true}
				floatingStyle={{}}
				opened={opened}
				style={{}}
				width={width}
				height={height}
			>
				{header}
				<iframe width="100%" height="100%" src="https://abot-app-4szu5khfbazlmqzcrxqvs4.streamlit.app/"></iframe>
			</ChatBotContainer>
		</div>
	);
}
