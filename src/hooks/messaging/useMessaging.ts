// hooks/useMessaging.ts
import { useState, useEffect, useCallback } from 'react';
import { Contact, Message } from '../../types/messaging';
import { fetchContacts, fetchMessages, sendMessage } from '../../data/messagingData';

export const useMessaging = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await fetchContacts();
      setContacts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load contacts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = useCallback(async (contactId: string) => {
    if (messages[contactId]) return;

    try {
      setLoading(true);
      const data = await fetchMessages(contactId);
      setMessages(prev => ({ ...prev, [contactId]: data }));
      setError(null);
    } catch (err) {
      setError('Failed to load messages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [messages]);

  const selectContact = useCallback((contact: Contact) => {
    setSelectedContact(contact);
    loadMessages(contact.id);
  }, [loadMessages]);

  const sendNewMessage = async (content: string) => {
    if (!selectedContact || !content.trim()) return;

    try {
      const newMessage = await sendMessage(selectedContact.id, content);
      setMessages(prev => ({
        ...prev,
        [selectedContact.id]: [...(prev[selectedContact.id] || []), newMessage],
      }));
      setError(null);
    } catch (err) {
      setError('Failed to send message');
      console.error(err);
    }
  };

  return {
    contacts,
    selectedContact,
    messages: selectedContact ? messages[selectedContact.id] || [] : [],
    loading,
    error,
    selectContact,
    sendNewMessage,
  };
};
