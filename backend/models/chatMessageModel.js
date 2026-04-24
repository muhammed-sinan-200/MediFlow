import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    sessionId: {
      type: String,
      default: "default",
    },
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    riskLevel: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    escalationType: {
      type: String,
      enum: ["none", "book_doctor", "urgent_care"],
      default: "none",
    },
  },
  { timestamps: true }
);

const chatMessageModel = mongoose.model("chatMessage", chatMessageSchema);

export default chatMessageModel;