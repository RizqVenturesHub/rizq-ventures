// components/Messaging/MessageBubble.tsx
import React from 'react';
import { Message } from '../../types/messaging';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <div
      className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-xl ${
          message.isCurrentUser ? 'items-end' : 'items-start'
        } flex flex-col gap-1`}
      >
        {message.type === 'text' && (
          <div
            className={`px-4 py-2.5 rounded-2xl ${
              message.isCurrentUser
                ? 'bg-gray-100 text-gray-900 rounded-br-md'
                : 'bg-gray-100 text-gray-900 rounded-bl-md'
            }`}
          >
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
        )}

        {message.type === 'image' && message.imageUrl && (
          <div className="space-y-2">
            <img
              src={message.imageUrl}
              alt="Shared content"
              className="rounded-xl max-w-md w-full h-auto shadow-md"
            />
            {message.linkUrl && (
              <a
                href={message.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline break-all"
              >
                {message.linkUrl}
              </a>
            )}
          </div>
        )}

        <span className="text-xs text-gray-500 px-1">{message.timestamp}</span>
      </div>
    </div>
  );
};

export default MessageBubble;
