// components/Messaging/ContactListItem.tsx
import React from 'react';
import { Contact } from '../../types/messaging';

interface ContactListItemProps {
  contact: Contact;
  isSelected: boolean;
  onClick: () => void;
}

const ContactListItem: React.FC<ContactListItemProps> = ({
  contact,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`px-6 py-3.5 flex items-start gap-3 cursor-pointer transition-all hover:bg-white/60 ${
        isSelected ? 'bg-white/80 border-l-4 border-primary' : ''
      }`}
    >
      <div className="relative flex-shrink-0">
        <img
          src={contact.avatar}
          alt={contact.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        {contact.isOnline && (
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-primary border-2 border-white rounded-full" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            {contact.isOnline && (
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            )}
            <h3 className="font-semibold text-gray-900 text-sm truncate">
              {contact.name}
            </h3>
          </div>
          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
            {contact.timestamp}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p
            className={`text-sm truncate ${
              contact.isTyping ? 'text-primary' : 'text-gray-600'
            }`}
          >
            {contact.lastMessage}
          </p>
          <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
            {contact.hasCheckmark && (
              <svg
                className="w-4 h-4 text-primary"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3333 4L6 11.3333L2.66667 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {contact.unreadCount && (
              <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-semibold">
                  {contact.unreadCount}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactListItem;
