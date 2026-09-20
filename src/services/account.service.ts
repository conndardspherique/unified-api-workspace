import type { Account, ProviderType } from "../types/account.js";
import type { Message, SendMessage } from "../types/message.js";
import type { MessagingProvider } from "../providers/provider.interface.js";
import { GmailProvider } from "../providers/gmail.provider.js";
import { OutlookProvider } from "../providers/outlook.provider.js";

export class AccountService {
  private readonly accounts: Account[] = [
    {
      id: "acc_gmail_001",
      provider: "gmail",
      identifier: "demo@gmail.com",
      displayName: "Demo Gmail"
    },
    {
      id: "acc_outlook_001",
      provider: "outlook",
      identifier: "demo@outlook.com",
      displayName: "Demo Outlook"
    }
  ];

  private readonly providers: Record<ProviderType, MessagingProvider> = {
    gmail: new GmailProvider(),
    outlook: new OutlookProvider(),
    linkedin: new GmailProvider()
  };

  getAccounts(): Account[] {
    return this.accounts;
  }

  getAccount(accountId: string): Account | undefined {
    return this.accounts.find((account) => account.id === accountId);
  }

  async getMessages(accountId: string): Promise<Message[]> {
    const account = this.getAccount(accountId);

    if (!account) {
      throw new Error("Account not found");
    }

    const provider = this.providers[account.provider];

    return provider.getMessages(accountId);
  }

  async sendMessage(
    accountId: string,
    message: SendMessage
  ): Promise<Message> {
    const account = this.getAccount(accountId);

    if (!account) {
      throw new Error("Account not found");
    }

    const provider = this.providers[account.provider];

    return provider.sendMessage(accountId, message);
  }
}