export interface Message {
  id: string;
  accountId: string;
  provider: string;
  sender: string;
  recipient: string;
  subject?: string;
  body: string;
  timestamp: string;
  read: boolean;
}

export interface SendMessage {
  recipient: string;
  subject?: string;
  body: string;
}