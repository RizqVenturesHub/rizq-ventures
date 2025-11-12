// components/Messaging/MessageInput.tsx
import React from 'react';
import { Send, Smile, Paperclip } from 'lucide-react';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSend,
  onKeyPress,
}) => {
  return (
    <div className="px-6 py-4 border-t border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
            <Paperclip className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex-1 relative">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="Type a message..."
              rows={1}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              style={{ minHeight: '42px', maxHeight: '120px' }}
            />
          </div>

          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
            <Smile className="w-5 h-5 text-gray-600" />
          </button>

          <button
            onClick={onSend}
            className="p-2.5 bg-primary hover:bg-primary-dark rounded-full transition-colors flex-shrink-0"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
