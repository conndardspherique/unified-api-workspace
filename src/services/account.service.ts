import type { Account } from "../types/account.js";
import type { Message, SendMessage } from "../types/message.js";
import type { MessagingProvider } from "../providers/provider.interface.js";
import { GmailProvider } from "../providers/gmail.provider.js";
import { OutlookProvider } from "../providers/outlook.provider.js";
import { AccountRepository } from "../repositories/account.repository.js";

export class AccountService {
  private readonly repository: AccountRepository;

  private readonly providers: Record<string, MessagingProvider> = {
    gmail: new GmailProvider(),
    outlook: new OutlookProvider()
  };

  constructor() {
    this.repository = new AccountRepository();
  }

  async getAccounts(): Promise<Account[]> {
    return this.repository.findAll();
  }

  async getAccount(accountId: string): Promise<Account | undefined> {
    return this.repository.findById(accountId);
  }

  async createAccount(account: Account): Promise<Account> {
    if (!this.providers[account.provider]) {
      throw new Error("Unsupported provider");
    }

    return this.repository.create(account);
  }

  async getMessages(accountId: string): Promise<Message[]> {
    const account = await this.getAccount(accountId);

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
    const account = await this.getAccount(accountId);

    if (!account) {
      throw new Error("Account not found");
    }

    const provider = this.providers[account.provider];

    return provider.sendMessage(accountId, message);
  }
}