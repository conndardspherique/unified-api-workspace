import { GmailProvider } from "../providers/gmail.provider.js";
import { OutlookProvider } from "../providers/outlook.provider.js";
export class AccountService {
    accounts = [
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
    providers = {
        gmail: new GmailProvider(),
        outlook: new OutlookProvider(),
        linkedin: new GmailProvider()
    };
    getAccounts() {
        return this.accounts;
    }
    getAccount(accountId) {
        return this.accounts.find((account) => account.id === accountId);
    }
    async getMessages(accountId) {
        const account = this.getAccount(accountId);
        if (!account) {
            throw new Error("Account not found");
        }
        const provider = this.providers[account.provider];
        return provider.getMessages(accountId);
    }
    async sendMessage(accountId, message) {
        const account = this.getAccount(accountId);
        if (!account) {
            throw new Error("Account not found");
        }
        const provider = this.providers[account.provider];
        return provider.sendMessage(accountId, message);
    }
}
