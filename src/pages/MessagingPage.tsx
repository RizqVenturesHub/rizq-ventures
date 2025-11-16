// pages/MessagingPage.tsx
import React from 'react';
import Header from '../components/Header';
import MessageSidebar from '../components/Messaging/MessageSidebar';
import ChatWindow from '../components/Messaging/ChatWindow';
import Footer from '../components/Footer';
import { useMessaging } from '../hooks/messaging/useMessaging'; 

const MessagingPage: React.FC = () => {
  const {
    contacts,
    selectedContact,
    messages,
    loading,
    error,
    selectContact,
    sendNewMessage,
  } = useMessaging();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-4 mt-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
      
      {/* Main messaging container with calculated height */}
      <div className="flex-1 flex overflow-hidden" style={{ height: 'calc(100vh - 64px - 200px)' }}>
        <MessageSidebar
          contacts={contacts}
          selectedContact={selectedContact}
          onSelectContact={selectContact}
          loading={loading}
        />
        <ChatWindow
          selectedContact={selectedContact}
          messages={messages}
          onSendMessage={sendNewMessage}
          loading={loading}
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default MessagingPage;
