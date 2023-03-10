import React from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

function ChatWidget(props) {
    return (
        <Widget
            title="Abot"
            subtitle="Smart Assistant"
            {...props}
        />
    );
}

export default ChatWidget;
export {
    addResponseMessage
};
