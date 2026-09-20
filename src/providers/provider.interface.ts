import type { Message, SendMessage } from "../types/message.js";

export interface MessagingProvider {
  getMessages(accountId: string): Promise<Message[]>;

  sendMessage(
    accountId: string,
    message: SendMessage
  ): Promise<Message>;
}