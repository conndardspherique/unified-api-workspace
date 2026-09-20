import type { Request, Response } from "express";
import { AccountService } from "../services/account.service.js";

const accountService = new AccountService();

export class AccountController {
  getAccounts = async (_req: Request, res: Response): Promise<void> => {
    const accounts = await accountService.getAccounts();
    res.json(accounts);
  };

  getAccount = async (
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> => {
    const account = await accountService.getAccount(req.params.id);

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

  createAccount = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const account = await accountService.createAccount(req.body);

      res.status(201).json(account);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error
          ? error.message
          : "Unable to create account"
      });
    }
  };
}