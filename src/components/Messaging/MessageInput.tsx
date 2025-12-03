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
    <div className="px-4 lg:px-6 py-3 lg:py-4 border-t border-gray-200 bg-white flex-shrink-0">
      <div className="max-w-3xl lg:max-w-4xl mx-auto">
        <div className="flex items-end gap-2 lg:gap-3">
          <button className="p-1.5 lg:p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
            <Paperclip className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
          </button>

          <div className="flex-1 relative">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="Type a message..."
              rows={1}
              className="w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs lg:text-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              style={{ minHeight: '38px', maxHeight: '100px' }}
            />
          </div>

          <button className="p-1.5 lg:p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
            <Smile className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
          </button>

          <button
            onClick={onSend}
            className="p-2 lg:p-2.5 bg-primary hover:bg-primary-dark rounded-full transition-colors flex-shrink-0"
          >
            <Send className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
