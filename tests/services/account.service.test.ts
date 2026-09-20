import { beforeEach, describe, expect, it, vi } from "vitest";
import { AccountService } from "../../src/services/account.service.js";

describe("AccountService", () => {
  let service: AccountService;

  beforeEach(() => {
    service = new AccountService();

    vi.spyOn(
      (service as any).repository,
      "findById"
    ).mockResolvedValue({
      id: "acc_gmail_001",
      provider: "gmail",
      identifier: "demo@gmail.com",
      displayName: "Demo Gmail"
    });
  });

  it("should reject unsupported providers", async () => {
    const account = {
      id: "acc_test",
      provider: "linkedin" as const,
      identifier: "test",
      displayName: "Test"
    };

    await expect(
      service.createAccount(account)
    ).rejects.toThrow("Unsupported provider");
  });

  it("should return messages for an existing account", async () => {
    const messages = await service.getMessages("acc_gmail_001");

    expect(messages).toHaveLength(1);
    expect(messages[0].provider).toBe("gmail");
  });

  it("should reject messages for an unknown account", async () => {
    vi.spyOn(
      (service as any).repository,
      "findById"
    ).mockResolvedValue(undefined);

    await expect(
      service.getMessages("unknown_account")
    ).rejects.toThrow("Account not found");
  });
});