import express from "express";
import userAuth from "../middlewares/userAuth.js";
import { chatWithAI, clearChatHistory, getChatHistory } from "../controllers/aiController.js";

const aiRouter = express.Router();


aiRouter.post("/chat", userAuth, chatWithAI);
aiRouter.get("/history", userAuth, getChatHistory);
aiRouter.post("/chat", userAuth, chatWithAI);
aiRouter.post("/clear", userAuth, clearChatHistory);

export default aiRouter;