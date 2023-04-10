import React, { useState, useContext, useEffect } from 'react';
import { Widget, addResponseMessage, isWidgetOpened, toggleMsgLoader } from 'react-chat-widget';

import AuthContext from '../AuthContext';

import Fab from '@mui/material/Fab'
import ChatIcon from '@mui/icons-material/Chat'
import CloseIcon from '@mui/icons-material/Close';

import 'react-chat-widget/lib/styles.css';

function CustomLauncherFab(toggle) {
  const fabStyle = {
    alignSelf: 'flex-end',
    marginTop: 0
  };

  const is_open = isWidgetOpened();

  return (
    <Fab color="primary" sx={fabStyle} aria-label="chat-widget" onClick={toggle}>
      {is_open ? <CloseIcon /> : <ChatIcon />}
    </Fab>
  );
}

export default function ChatWidget(props) {
  let { title, subtitle, chatConnection, ...rest } = props;

  title ??= "Chat";
  subtitle ??= "Smart Assistant";

  const [chatSession, setChatSession] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setChatSession({
      sender_id: user.user_name || "_"
    });
  }, [user]);

  const sendChatMessage = async message => {
    if (chatConnection !== undefined) {
      const message_data = {
        "text": message,
        "sender_id": chatSession.sender_id
      };
      await chatConnection.sendMessage(message_data)
    }
    //TODO: Handle failed cases
  };

  const recvChatMessage = e => {
    if (e.detail === null) {
      addResponseMessage(`Sorry! There was a problem generating the response. Please report this issue to the developers at [phAIdelta.com](https://www.phaidelta.com/).`);
      return;
    }

    if (e.detail.text !== undefined)
      addResponseMessage(e.detail.text);
    if (e.detail.image !== undefined)
      addResponseMessage(`![image](${e.detail.image})`);
    //TODO: Add buttons, quick response, etc.
  };

  const toggleTypingDots = () => {};//toggleMsgLoader();

  const setupConnectionEvents = conn => {
    conn.addEventListener("chat-response", recvChatMessage);
    conn.addEventListener("typing-start", toggleTypingDots);
    conn.addEventListener("typing-stop", toggleTypingDots);
    return conn_old => {
      conn_old.removeEventListener("chat-response", recvChatMessage);
      conn_old.removeEventListener("typing-start", toggleTypingDots);
      conn_old.removeEventListener("typing-stop", toggleTypingDots);
    };
  };

  useEffect(() => {
    const cleanup = setupConnectionEvents(chatConnection);
    return c => c && cleanup(c);
  }, [chatConnection]);

  useEffect(() => {
    addResponseMessage("Hi! I am Abot! Ask me anything!");
  }, [])

  return (
    <Widget
      title={title}
      subtitle={subtitle}
      handleNewUserMessage={sendChatMessage}
      launcher={CustomLauncherFab}
      emojis={false}
      {...rest}
      />
  );
}
