// components/Messaging/ChatHeader.tsx
import React from 'react';
import { Video, Phone, Info } from 'lucide-react';
import { Contact } from '../../types/messaging';

interface ChatHeaderProps {
  contact: Contact;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ contact }) => {
  return (
    <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-200 flex items-center justify-between bg-white flex-shrink-0">
      <div className="flex items-center gap-2 lg:gap-3">
        <div className="relative">
          <img
            src={contact.avatar}
            alt={contact.name}
            className="w-9 h-9 lg:w-10 lg:h-10 rounded-full object-cover"
          />
          {contact.isOnline && (
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 lg:w-3 lg:h-3 bg-primary border-2 border-white rounded-full" />
          )}
        </div>
        <div>
          <h2 className="font-semibold text-gray-900 text-sm lg:text-base">{contact.name}</h2>
          <p className="text-xs text-primary">
            {contact.isOnline ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 lg:gap-2">
        <button className="p-1.5 lg:p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Video className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
        </button>
        <button className="p-1.5 lg:p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Phone className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
        </button>
        <button className="p-1.5 lg:p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Info className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
