// data/messagingData.ts
import { Contact, Message, ChatData } from '../types/messaging';

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=12',
    lastMessage: 'How are you doing?',
    timestamp: '16:45',
    isOnline: false,
    hasCheckmark: true,
  },
  {
    id: '2',
    name: 'Travis Barker',
    avatar: 'https://i.pravatar.cc/150?img=33',
    lastMessage: '... is typing',
    timestamp: '16:45',
    isOnline: true,
    isTyping: true,
  },
  {
    id: '3',
    name: 'Kate Rose',
    avatar: 'https://i.pravatar.cc/150?img=45',
    lastMessage: 'you: See you tomorrow!',
    timestamp: '16:45',
    isOnline: false,
    hasCheckmark: true,
  },
  {
    id: '4',
    name: 'Robert Parker',
    avatar: 'https://i.pravatar.cc/150?img=56',
    lastMessage: 'Awesome!',
    timestamp: '16:45',
    isOnline: true,
    unreadCount: 2,
  },
  {
    id: '5',
    name: 'Rick Owens',
    avatar: 'https://i.pravatar.cc/150?img=68',
    lastMessage: 'Good idea😊',
    timestamp: '16:45',
    isOnline: true,
  },
  {
    id: '6',
    name: 'George Orwell',
    avatar: 'https://i.pravatar.cc/150?img=13',
    lastMessage: 'you: Literally 1984🤐',
    timestamp: '16:45',
    isOnline: false,
    hasCheckmark: true,
  },
  {
    id: '7',
    name: 'Franz Kafka',
    avatar: 'https://i.pravatar.cc/150?img=51',
    lastMessage: 'Are you interested in insectitides for...',
    timestamp: '16:45',
    isOnline: false,
    hasCheckmark: true,
  },
  {
    id: '8',
    name: 'Tom Hardy',
    avatar: 'https://i.pravatar.cc/150?img=14',
    lastMessage: 'Smells like design spirit..',
    timestamp: '16:45',
    isOnline: false,
    hasCheckmark: true,
  },
  {
    id: '9',
    name: 'Vivienne Westwood',
    avatar: 'https://i.pravatar.cc/150?img=47',
    lastMessage: 'This cat is so funny🤪',
    timestamp: '16:45',
    isOnline: false,
    hasCheckmark: true,
  },
  {
    id: '10',
    name: 'Anthony Paul',
    avatar: 'https://i.pravatar.cc/150?img=15',
    lastMessage: 'Check out my page😎',
    timestamp: '16:45',
    isOnline: false,
    hasCheckmark: true,
  },
];

export const mockMessages: Record<string, Message[]> = {
  '2': [
    {
      id: '1',
      content: 'Hi! I made new UI-Kit for project, check it late',
      timestamp: '15:42',
      senderId: '2',
      isCurrentUser: false,
      type: 'text',
    },
    {
      id: '2',
      content: '',
      timestamp: '15:42',
      senderId: '2',
      isCurrentUser: false,
      type: 'image',
      imageUrl: 'https://cdn.dribbble.com/userupload/17742253/file/original-07c2a8c2b827c8b5f8bf0fb9d5b1a4fa.jpg',
      linkUrl: 'https://dribbble.com/shots/17742253-Ui-kit-designjam',
    },
    {
      id: '3',
      content: 'See you at office tomorrow!',
      timestamp: '15:42',
      senderId: '2',
      isCurrentUser: false,
      type: 'text',
    },
    {
      id: '4',
      content: 'Thank you for work, see you!',
      timestamp: '15:42',
      senderId: 'current',
      isCurrentUser: true,
      type: 'text',
    },
    {
      id: '5',
      content: 'Hello! Have you seen my backpack anywhere in office?',
      timestamp: '15:42',
      senderId: '2',
      isCurrentUser: false,
      type: 'text',
    },
    {
      id: '6',
      content: 'Hi, yes, David have found it, ask our concierge👀',
      timestamp: '15:42',
      senderId: 'current',
      isCurrentUser: true,
      type: 'text',
    },
  ],
};

export const fetchContacts = async (): Promise<Contact[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockContacts), 300);
  });
};

export const fetchMessages = async (contactId: string): Promise<Message[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockMessages[contactId] || []), 300);
  });
};

export const sendMessage = async (
  contactId: string,
  content: string,
  type: 'text' | 'image' = 'text'
): Promise<Message> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        content,
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        senderId: 'current',
        isCurrentUser: true,
        type,
      };
      resolve(newMessage);
    }, 300);
  });
};
