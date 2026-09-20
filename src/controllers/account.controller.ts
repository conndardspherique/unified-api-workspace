import type { Request, Response } from "express";
import { AccountService } from "../services/account.service.js";

const accountService = new AccountService();

export class AccountController {
  getAccounts = (_req: Request, res: Response): void => {
    res.json(accountService.getAccounts());
  };

  getAccount = (
    req: Request<{ id: string }>,
    res: Response
  ): void => {
    const account = accountService.getAccount(req.params.id);

    if (!account) {
      res.status(404).json({
        error: "Account not found"
      });
      return;
    }

    res.json(account);
  };

  getMessages = async (
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> => {
    try {
      const messages = await accountService.getMessages(req.params.id);

      res.json(messages);
    } catch {
      res.status(404).json({
        error: "Account not found"
      });
    }
  };

  sendMessage = async (
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> => {
    try {
      const message = await accountService.sendMessage(
        req.params.id,
        req.body
      );

      res.status(201).json(message);
    } catch {
      res.status(404).json({
        error: "Account not found"
      });
    }
  };
}