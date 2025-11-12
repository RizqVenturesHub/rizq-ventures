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
    <div className="w-96 bg-primary-light border-r border-gray-200 flex flex-col h-full">
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Sort by</span>
          <button className="flex items-center gap-1 text-primary font-medium hover:text-primary-dark transition-colors">
            {sortBy}
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading && contacts.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">Loading contacts...</div>
        ) : filteredContacts.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">No contacts found</div>
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
