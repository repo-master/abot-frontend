
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

  // HACK: Since only `toggle` method is there, I'm also using is_dots_visible flag to know if the dots are visible
  let show_dots_timer = null;
  let is_dots_visible = false;
  let hide_dots_timer = null;
  const hideTypingDots = () => {
    if (hide_dots_timer === null) {
      hide_dots_timer = setTimeout(() => {
        if (is_dots_visible) {
          console.log("Hiding")
          toggleMsgLoader();
          is_dots_visible = false;
        }
        hide_dots_timer = null;
      }, 250);
    }
    if (show_dots_timer !== null) {
      clearTimeout(show_dots_timer);
      show_dots_timer = null;
    }
  };
  const typingDotsEvent = () => {
    if (!is_dots_visible) {
      // Show dots
      toggleMsgLoader();
      is_dots_visible = true;
    }
    // Reset timer to count down again
    clearTimeout(show_dots_timer);
    show_dots_timer = setTimeout(hideTypingDots, 3000);
  };

  const sendChatMessage = async message => {
    if (chatConnection !== undefined) {
      const message_data = {
        "text": message,
        "sender_id": chatSession.sender_id
      };
      typingDotsEvent();
      await chatConnection.sendMessage(message_data);
    }
    //TODO: Handle failed cases
  };

  const recvChatMessage = e => {
    if (e.detail === null) {
      addResponseMessage(`Sorry! There was a problem generating the response. Please report this issue to the developers at [phAIdelta.com](https://www.phaidelta.com/).`);
      return;
    }

    hideTypingDots();

    if (e.detail.text !== undefined && e.detail.text !== null )
      addResponseMessage(e.detail.text);
    if (e.detail.image !== undefined && e.detail.image !== null)
      addResponseMessage(`![image](${e.detail.image})`);
    //TODO: Add buttons, quick response, etc.
  };

  const setupConnectionEvents = conn => {
    conn.addEventListener("chat-response", recvChatMessage);
    conn.addEventListener("typing", typingDotsEvent);
    return conn_old => {
      conn_old.removeEventListener("chat-response", recvChatMessage);
      conn_old.removeEventListener("typing", typingDotsEvent);
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
