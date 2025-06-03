export interface ProcessedDocument {
  id: string;
  fileName: string;
  extractedText?: string;
  uploadedAt: Date;
  chatInteractions?: Message[];
  size: number;
}

export interface DocumentResponse {
  id: string;
  userId: string;
  fileUrl: string;
  fileName: string;
  size: number;
  extractedText: string;
  createdAt: string;
  chatInteractions: {
    id: string;
    documentId: string;
    prompt: string;
    response: string;
    createdAt: Date;
  }[];
}

export interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export type UploadStatus =
  | "idle"
  | "uploading"
  | "processing"
  | "success"
  | "error";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
