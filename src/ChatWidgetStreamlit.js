import React, { useState } from 'react';
import { FloatButton, FloatingIcon, ChatIcon } from 'react-simple-chatbot';

export function ChatBotWidget(props) {
	const [opened, setOpened] = useState(false);

	// const header = headerComponent || (
	// <Header className="rsc-header">
	// 	<HeaderTitle className="rsc-header-title">{headerTitle}</HeaderTitle>
	// 	{floating && (
	// 	<HeaderIcon className="rsc-header-close-button" onClick={() => this.toggleChatBot(false)}>
	// 		<CloseIcon />
	// 	</HeaderIcon>
	// 	)}
	// </Header>
	// );

	return (
		<div>
			<FloatButton
				className="rsc-float-button"
				style={{}}
				opened={opened}
				onClick={() => toggleChatBot(true)}>
				{<FloatingIcon src={<ChatIcon />} />}
			</FloatButton>
		</div>
	);
}
  