import type { Message, SendMessage } from "../types/message.js";
import type { MessagingProvider } from "./provider.interface.js";

export class OutlookProvider implements MessagingProvider {
  async getMessages(accountId: string): Promise<Message[]> {
    return [
      {
        id: "msg_outlook_001",
        accountId,
        provider: "outlook",
        sender: "contact@outlook.example",
        recipient: "demo@outlook.example",
        subject: "Hello from Outlook",
        body: "This is a mock Outlook message.",
        timestamp: new Date().toISOString(),
        read: false
      }
    ];
  }

  async sendMessage(
    accountId: string,
    message: SendMessage
  ): Promise<Message> {
    return {
      id: `msg_outlook_${Date.now()}`,
      accountId,
      provider: "outlook",
      sender: "demo@outlook.example",
      recipient: message.recipient,
      subject: message.subject,
      body: message.body,
      timestamp: new Date().toISOString(),
      read: true
    };
  }
}