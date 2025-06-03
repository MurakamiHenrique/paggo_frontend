import api from "@/src/services/api";
import { setTimeout } from "timers";

interface ChatResponse {
  answer: string;
}

interface DocumentDownloadResponse {
  content: string;
}

export const chatService = {
  async talkToGemini(
    question: string,
    documentId: string,
  ): Promise<ChatResponse> {
    try {
      const { data } = await api.post(`/documents/${documentId}/chat`, {
        question: question,
      });
      return {
        answer: data.answer,
      };
    } catch (error: any) {
      console.error("Error getting chat response:", error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to get chat response",
      );
    }
  },

  async downloadChat(documentId: string): Promise<DocumentDownloadResponse> {
    try {
      const { data } = await api.get(`/documents/${documentId}/download`);
      return {
        content: data,
      };
    } catch (error: any) {
      console.error("Error downloading document:", error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to download document",
      );
    }
  },
};
