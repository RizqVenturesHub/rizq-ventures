// components/Messaging/MessageSidebar.tsx
import React from 'react';
import { Search, Settings, LogOut, ChevronDown } from 'lucide-react';
import { Contact } from '../../types/messaging';
import { useContactSearch } from '../../hooks/messaging/useContactSearch'; 
import ContactListItem from './ContactListItem';

interface MessageSidebarProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  onSelectContact: (contact: Contact) => void;
  loading?: boolean;
}

const MessageSidebar: React.FC<MessageSidebarProps> = ({
  contacts,
  selectedContact,
  onSelectContact,
  loading,
}) => {
  const { searchQuery, setSearchQuery, sortBy, filteredContacts } = useContactSearch(contacts);

  return (
    <div className="w-80 lg:w-96 bg-primary-light border-r border-gray-200 flex flex-col h-full">
      {/* Header Section - Fixed */}
      <div className="p-4 lg:p-6 pb-3 lg:pb-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Messages</h1>
          <div className="flex items-center gap-1 lg:gap-2">
            <button className="p-1.5 lg:p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Settings className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
            </button>
            <button className="p-1.5 lg:p-2 hover:bg-gray-100 rounded-full transition-colors">
              <LogOut className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-3 lg:mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 lg:pl-10 pr-4 py-2 lg:py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Sort By */}
        <div className="flex items-center gap-2 text-xs lg:text-sm">
          <span className="text-gray-600">Sort by</span>
          <button className="flex items-center gap-1 text-primary font-medium hover:text-primary-dark transition-colors">
            {sortBy}
            <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4" />
          </button>
        </div>
      </div>

      {/* Contacts List - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {loading && contacts.length === 0 ? (
          <div className="px-4 lg:px-6 py-8 text-center text-gray-500 text-sm">
            Loading contacts...
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="px-4 lg:px-6 py-8 text-center text-gray-500 text-sm">
            No contacts found
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <ContactListItem
              key={contact.id}
              contact={contact}
              isSelected={selectedContact?.id === contact.id}
              onClick={() => onSelectContact(contact)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MessageSidebar;
