// hooks/useMessageInput.ts
import { useState, useCallback } from 'react';

export const useMessageInput = (onSend: (message: string) => void) => {
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = useCallback(() => {
    if (messageInput.trim()) {
      onSend(messageInput);
      setMessageInput('');
    }
  }, [messageInput, onSend]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  return {
    messageInput,
    setMessageInput,
    handleSendMessage,
    handleKeyPress,
  };
};
