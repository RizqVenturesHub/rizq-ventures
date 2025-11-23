// types/messaging.ts
export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  isOnline: boolean;
  isTyping?: boolean;
  unreadCount?: number;
  hasCheckmark?: boolean;
}

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  senderId: string;
  isCurrentUser: boolean;
  type?: 'text' | 'image' | 'link';
  imageUrl?: string;
  linkUrl?: string;
}

export interface ChatData {
  contacts: Contact[];
  messages: Record<string, Message[]>;
}
