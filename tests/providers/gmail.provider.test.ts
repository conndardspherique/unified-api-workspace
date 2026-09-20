import { describe, expect, it } from "vitest";
import { GmailProvider } from "../../src/providers/gmail.provider.js";

describe("GmailProvider", () => {
  const provider = new GmailProvider();

  it("should return messages for an account", async () => {
    const messages = await provider.getMessages("acc_gmail_001");

    expect(messages).toHaveLength(1);
    expect(messages[0]).toMatchObject({
      accountId: "acc_gmail_001",
      provider: "gmail",
      sender: "contact@example.com",
      recipient: "demo@gmail.com",
      read: false
    });
  });

  it("should send a message", async () => {
    const message = await provider.sendMessage("acc_gmail_001", {
      recipient: "test@example.com",
      subject: "Test",
      body: "Hello from Vitest"
    });

    expect(message).toMatchObject({
      accountId: "acc_gmail_001",
      provider: "gmail",
      recipient: "test@example.com",
      subject: "Test",
      body: "Hello from Vitest"
    });
  });
});