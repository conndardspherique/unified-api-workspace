import { Router } from "express";
import { AccountController } from "../controllers/account.controller.js";
const router = Router();
const controller = new AccountController();
router.get("/", controller.getAccounts);
router.get("/:id", controller.getAccount);
router.get("/:id/messages", controller.getMessages);
router.post("/:id/messages", controller.sendMessage);
export default router;
