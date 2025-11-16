// components/Messaging/ChatWindow.tsx
import React, { useRef, useEffect } from 'react';
import { Contact, Message } from '../../types/messaging';
import { useMessageInput } from '../../hooks/messaging/useMessageInput'; 
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import EmptyChat from './EmptyChat';

interface ChatWindowProps {
  selectedContact: Contact | null;
  messages: Message[];
  onSendMessage: (content: string) => void;
  loading?: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  selectedContact,
  messages,
  onSendMessage,
  loading,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messageInput, setMessageInput, handleSendMessage, handleKeyPress } =
    useMessageInput(onSendMessage);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!selectedContact) {
    return <EmptyChat />;
  }

  return (
    <div className="flex-1 bg-white flex flex-col h-full overflow-hidden">
      {/* Header - Fixed */}
      <ChatHeader contact={selectedContact} />

      {/* Messages - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 lg:px-6 py-3 lg:py-4 bg-white">
        <div className="max-w-3xl lg:max-w-4xl mx-auto space-y-3 lg:space-y-4">
          {loading && messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8 text-sm">Loading messages...</div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8 text-sm">No messages yet</div>
          ) : (
            messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input - Fixed */}
      <MessageInput
        value={messageInput}
        onChange={setMessageInput}
        onSend={handleSendMessage}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default ChatWindow;
