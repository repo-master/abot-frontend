
import React, { useState } from 'react';

import Loading from './common/Loading';
import TextStepContainer from './text/TextStepContainer';
import ImageContainer from './text/ImageContainer';
import Bubble from './text/Bubble';
import Image from './text/Image';

export default function Message(props) {
  const { isLoading, role, avatar } = props;
  let avatarEnabled = props.avatarEnabled || true;

  const is_user = role === 'user';

  return (
    <TextStepContainer className={`rsc-ts ${is_user ? 'rsc-ts-user' : 'rsc-ts-bot'}`} user={is_user}>
      <ImageContainer className="rsc-ts-image-container" user={is_user}>
        {true && true && (
          <Image
            className="rsc-ts-image"
            // style={avatarStyle}
            showAvatar={avatarEnabled}
            isUser={is_user}
            src={avatar}
            alt={role}
          />
        )}
      </ImageContainer>
      <Bubble
        className="rsc-ts-bubble"
        // style={bubbleStyle}
        user={is_user}
        showAvatar={avatarEnabled}
        isFirst={true}
        isLast={true}
      >
        {isLoading ? <Loading /> : props.children}
      </Bubble>
    </TextStepContainer>
  );
}
