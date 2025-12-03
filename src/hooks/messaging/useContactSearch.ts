// hooks/useContactSearch.ts
import { useState, useMemo } from 'react';
import { Contact } from '../../types/messaging';

export const useContactSearch = (contacts: Contact[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Newest');

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [contacts, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filteredContacts,
  };
};
