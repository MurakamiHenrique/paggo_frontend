import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { documentService } from "@/src/services/document-service";
import type { ProcessedDocument, Message } from "@/src/interfaces";
import { HistorySidebar } from "@/src/components/history-sidebar";
import { HistoryToggleButton } from "@/src/components/history-toggle-button";
import { LoadingSpinner } from "@/src/components/loading-spinner";
import { MainLayout, Container, ContentArea } from "@/src/components/layout";
import { FileUpload } from "@/src/components/file-upload-modal";
import { Button } from "@/src/components/button";
import { useAuth } from "@/src/hooks/use-auth";

import * as S from "./styles";

export default function HomePage() {
  const { logout } = useAuth();
  const router = useRouter();
  const [currentDocument, setCurrentDocument] =
    useState<ProcessedDocument | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [documentHistory, setDocumentHistory] = useState<ProcessedDocument[]>(
    []
  );
  const [showHistory, setShowHistory] = useState(false);

  const handleFileProcessed = (documentId: string, fileName: string) => {
    const initialMessage: Message = {
      id: "1",
      type: "assistant",
      content: `Hello! I've analyzed your document "${fileName}" and extracted the text content. I'm ready to help you understand and analyze the information. What would you like to know about it?`,
      timestamp: new Date(),
    };

    const documentWithChat: ProcessedDocument = {
      id: documentId,
      fileName: fileName,
      chatInteractions: [initialMessage],
      uploadedAt: new Date(),
      extractedText: "",
      size: 0,
    };

    setCurrentDocument(documentWithChat);
    setIsProcessing(false);
    setDocumentHistory((prev) => [documentWithChat, ...prev]);

    router.push(`/chat?documentId=${documentId}`);
  };

  const handleFileUploading = () => {
    setIsProcessing(true);
    setCurrentDocument(null);
  };

  const handleSelectHistoryDocument = (document: ProcessedDocument) => {
    setCurrentDocument(document);
    router.push(`/chat?documentId=${document.id}`, undefined, {
      shallow: true,
    });
  };

  const handleNewUpload = () => {
    setCurrentDocument(null);
  };

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const documents = await documentService.getAllDocuments();
        setDocumentHistory(documents);
      } catch (error) {
        console.error("Error loading documents:", error);
      }
    };

    loadDocuments();
  }, []);

  return (
    <MainLayout>
      <HistorySidebar
        show={showHistory}
        documents={documentHistory}
        onSelectDocument={handleSelectHistoryDocument}
        currentDocumentId={currentDocument?.id}
      />
      <ContentArea>
        <Container>
          <ContentArea>
            <Container>
              <S.Header>
                <S.ButtonContainer>
                  <HistoryToggleButton
                    isOpen={showHistory}
                    count={documentHistory.length}
                    onClick={() => setShowHistory(!showHistory)}
                  />
                </S.ButtonContainer>
                <S.HeaderText>
                  <S.Title>Document Processing Platform</S.Title>
                  <S.Description>
                    Upload documents, extract text with OCR, and get AI-powered
                    explanations
                  </S.Description>
                </S.HeaderText>
                <S.ButtonContainer>
                  <Button variant="ghost" onClick={logout}>
                    Logout
                  </Button>
                </S.ButtonContainer>
              </S.Header>
            </Container>
          </ContentArea>

          {!currentDocument && !isProcessing && (
            <S.UploadContainer>
              <FileUpload
                onFileUploading={handleFileUploading}
                onFileProcessed={handleFileProcessed}
              />
            </S.UploadContainer>
          )}

          {isProcessing && (
            <S.ProcessingContainer>
              <LoadingSpinner text="Processing document with OCR..." />
            </S.ProcessingContainer>
          )}
        </Container>
      </ContentArea>
    </MainLayout>
  );
}
