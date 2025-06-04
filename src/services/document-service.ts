import type {
  ProcessedDocument,
  DocumentResponse,
  Message,
} from "../interfaces";
import api from "./api";

export const documentService = {
  ACCEPTED_FILE_TYPES: {
    "application/pdf": [".pdf"],
    "image/*": [".png", ".jpg", ".jpeg"],
  },

  async checkBackendStatus(): Promise<boolean> {
    try {
      const response = await api.get("/documents/health");
      return response.status === 200;
    } catch (error) {
      console.error("Backend health check failed:", error);
      return false;
    }
  },

  async processFile(file: File, lang: string = "eng") {
    try {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      const isValidType = Object.values(this.ACCEPTED_FILE_TYPES)
        .flat()
        .includes(`.${fileExtension}`);

      if (!isValidType) {
        throw new Error("Only image (JPG, PNG) or PDF files are allowed!");
      }

      const MAX_SIZE = 10 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        throw new Error("File size exceeds 10MB limit");
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post(
        `/documents/upload?lang=${lang}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!,
            );
          },
        },
      );

      if (!response.data.documentId) {
        throw new Error("Failed to get document ID from server");
      }

      return {
        documentId: response.data.documentId,
        fileName: file.name,
      };
    } catch (error: any) {
      console.error("Error uploading document:", error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to upload document",
      );
    }
  },

  async getFile(documentId: string): Promise<ProcessedDocument> {
    try {
      const { data } = await api.get<DocumentResponse>(
        `/documents/${documentId}`,
      );

      const chatMessages = data.chatInteractions.flatMap((interaction) => {
        const userMessage: Message = {
          id: `user-${interaction.id}`,
          type: "user",
          content: interaction.prompt,
          timestamp: new Date(interaction.createdAt),
        };

        const assistantMessage: Message = {
          id: `assistant-${interaction.id}`,
          type: "assistant",
          content: interaction.response,
          timestamp: new Date(interaction.createdAt),
        };
        if (!interaction.prompt) {
          return [assistantMessage];
        }
        return [userMessage, assistantMessage];
      });

      return {
        id: data.id,
        fileName: data.fileName,
        size: data.size,
        uploadedAt: new Date(data.createdAt),
        extractedText: data.extractedText,
        chatInteractions: chatMessages,
      };
    } catch (error: any) {
      console.error("Error fetching document:", error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch document",
      );
    }
  },

  async getAllDocuments(): Promise<ProcessedDocument[]> {
    try {
      const response = await api.get("/documents/history");
      const { data } = response;
      return data.map((doc: any) => ({
        id: doc.id,
        fileName: doc.fileName,
        size: doc.size,
        uploadedAt: new Date(doc.createdAt),
      }));
    } catch (error: any) {
      console.error("Error fetching documents:", error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch document history",
      );
    }
  },

  async deleteDocument(documentId: string): Promise<void> {
    try {
      await api.delete(`/documents/${documentId}`);
    } catch (error: any) {
      console.error("Error deleting document:", error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete document",
      );
    }
  },
};
