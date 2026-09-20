import type { Message, SendMessage } from "../types/message.js";
import type { MessagingProvider } from "./provider.interface.js";

export class GmailProvider implements MessagingProvider {
  async getMessages(accountId: string): Promise<Message[]> {
    return [
      {
        id: "msg_001",
        accountId,
        provider: "gmail",
        sender: "contact@example.com",
        recipient: "demo@gmail.com",
        subject: "Hello from Gmail",
        body: "This is a mock Gmail message.",
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
      id: `msg_${Date.now()}`,
      accountId,
      provider: "gmail",
      sender: "demo@gmail.com",
      recipient: message.recipient,
      subject: message.subject,
      body: message.body,
      timestamp: new Date().toISOString(),
      read: true
    };
  }
}