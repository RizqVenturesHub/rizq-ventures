// components/Messaging/ChatHeader.tsx
import React from 'react';
import { Video, Phone, Info } from 'lucide-react';
import { Contact } from '../../types/messaging';

interface ChatHeaderProps {
  contact: Contact;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ contact }) => {
  return (
    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={contact.avatar}
            alt={contact.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          {contact.isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary border-2 border-white rounded-full" />
          )}
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">{contact.name}</h2>
          <p className="text-xs text-primary">
            {contact.isOnline ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Video className="w-5 h-5 text-primary" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Phone className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Info className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
