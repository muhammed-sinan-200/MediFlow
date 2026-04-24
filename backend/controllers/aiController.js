import detectRisk from "../utils/riskDetector.js";
import generateAIResponse from "../services/aiService.js";
import chatMessageModel from "../models/chatMessageModel.js";

const chatWithAI = async (req, res) => {
  try {
    const userId = req.userId;
    const { message, sessionId } = req.body;

    if (!message || !message.trim()) {
      return res.json({
        success: false,
        message: "Message is required",
      });
    }

    const activeSessionId = sessionId || "default";
    const cleanMessage = message.trim();

    const risk = detectRisk(cleanMessage);

    await chatMessageModel.create({
      userId,
      sessionId: activeSessionId,
      role: "user",
      message: cleanMessage,
      riskLevel: risk.riskLevel,
      escalationType: risk.escalationType,
    });

    let finalReply = "";

    if (risk.riskLevel === "high") {
      finalReply =
        "This may be a serious condition. Please seek immediate medical attention or visit the nearest hospital.";
    } else {
      const recentMessages = await chatMessageModel
        .find({ userId, sessionId: activeSessionId })
        .sort({ createdAt: -1 })
        .limit(10)
        .select("role message createdAt")
        .lean();

      const orderedHistory = recentMessages.reverse();

      finalReply = await generateAIResponse(cleanMessage, orderedHistory);
    }

    await chatMessageModel.create({
      userId,
      sessionId: activeSessionId,
      role: "assistant",
      message: finalReply,
      riskLevel: risk.riskLevel,
      escalationType: risk.escalationType,
    });

    return res.json({
      success: true,
      reply: finalReply,
      ...risk,
    });
  } catch (error) {
    console.log("AI Controller Error:", error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const getChatHistory = async (req, res) => {
  try {
    const userId = req.userId;

    const messages = await chatMessageModel
      .find({ userId })
      .sort({ createdAt: 1 })
      .select("role message riskLevel escalationType createdAt sessionId");

    return res.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log("History Error:", error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const clearChatHistory = async (req, res) => {
  try {
    const userId = req.userId;
    const { sessionId } = req.body;

    await chatMessageModel.deleteMany({
      userId,
      sessionId: sessionId || "default",
    });

    return res.json({
      success: true,
      message: "Chat history cleared successfully",
    });
  } catch (error) {
    console.log("Clear Chat Error:", error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export { chatWithAI, getChatHistory, clearChatHistory };