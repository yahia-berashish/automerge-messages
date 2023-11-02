export interface Chat {
  id: number;
  name: string;
  users: string[];
  messages: Message[];
}

export interface Message {
  id: number;
  senderId: string;
  senderName: string;
  content: string;
  reply?: number;
}
