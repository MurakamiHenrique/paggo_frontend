import type { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/src/hooks/use-auth";
import { documentService } from "@/src/services/document-service";
import type { ProcessedDocument, Message } from "@/src/interfaces";
import { HistorySidebar } from "@/src/components/history-sidebar";
import { HistoryToggleButton } from "@/src/components/history-toggle-button";
import { MainLayout, Container, ContentArea } from "@/src/components/layout";
import { DocumentViewer } from "@/src/components/document-viewer";
import { ChatInterface } from "@/src/components/chat-interface";
import { Button } from "@/src/components/button";
import { Plus } from "lucide-react";
import * as S from "./styles";

interface ChatPageProps {
  initialDocument?: ProcessedDocument;
  error?: string;
}

export default function ChatPage({ initialDocument, error }: ChatPageProps) {
  const [currentDocument, setCurrentDocument] = useState<ProcessedDocument | null>(initialDocument || null);
  const [documentHistory, setDocumentHistory] = useState<ProcessedDocument[]>(
    []
  );

  const [showHistory, setShowHistory] = useState(false);
  const [isFromHistory, setIsFromHistory] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();
  const { documentId } = router.query;

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

  useEffect(() => {
    const fetchDocument = async (id: string) => {
      try {
        if (isFromHistory) {
          setIsFromHistory(false);
          return;
        }
        const document = await documentService.getFile(id);
        setCurrentDocument(document);
      } catch (error) {
        console.error("Error fetching document:", error);
        router.push("/");
      }
    };

    if (typeof documentId === "string" && !isFromHistory) {
      fetchDocument(documentId);
    }
  }, [documentId]);

  const handleAddMessage = async (documentId: string, newMessage: Message) => {
    if (!currentDocument || currentDocument.id !== documentId) return;

    const updatedDocument = {
      ...currentDocument,
      chatInteractions: [...(currentDocument.chatInteractions || []), newMessage],
    };

    setCurrentDocument(updatedDocument);

    setDocumentHistory((prev) =>
      prev.map((doc) => (doc.id === documentId ? updatedDocument : doc)),
    );
  };

  const handleSelectHistoryDocument = async (document: ProcessedDocument) => {
    try {
      if (document.id === currentDocument?.id) {
        return;
      }
      setIsFromHistory(true);
      const completeDocument = await documentService.getFile(document.id);
      setCurrentDocument(completeDocument);
      router.replace(`/chat?documentId=${document.id}`, undefined, {
        shallow: true,
      });
    } catch (error) {
      console.error("Error loading document:", error);
    }
  };
  
  const handleNewUpload = () => {
    setCurrentDocument(null);
    router.push("/home");
  };

  const handleDeleteDocument = (documentId: string) => {
    setDocumentHistory((prev) => prev.filter((doc) => doc.id !== documentId));
    if (currentDocument?.id === documentId) {
      setCurrentDocument(null);
      router.push("/home");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <MainLayout>
      <HistorySidebar
        show={showHistory}
        documents={documentHistory}
        onSelectDocument={handleSelectHistoryDocument}
        onDeleteDocument={handleDeleteDocument}
        currentDocumentId={currentDocument?.id}
      />
      <ContentArea>
        <Container>
          <S.Header>
            <S.ButtonContainer>
              <HistoryToggleButton
                isOpen={showHistory}
                count={documentHistory.length}
                onClick={() => setShowHistory(!showHistory)}
              />
              <Button
                variant="outline"
                size="md"
                onClick={handleNewUpload}
                style={{ border: 0, padding: 16 }}
              >
                <Plus size={28} />
              </Button>
            </S.ButtonContainer>
            <S.HeaderText>
              <S.Title>Document Processing Platform</S.Title>
            </S.HeaderText>
            <S.ButtonContainer>
              <Button variant="ghost" onClick={logout}>
                Logout
              </Button>
            </S.ButtonContainer>
          </S.Header>
          {currentDocument && (
            <S.WorkspaceGrid>
              <DocumentViewer
                document={currentDocument}
                onNewUpload={handleNewUpload}
              />
              <ChatInterface
                document={currentDocument}
                onAddMessage={(message) =>
                handleAddMessage(currentDocument.id, message)
                }
                documentId={currentDocument.id}
              />
            </S.WorkspaceGrid>
          )}
        </Container>
      </ContentArea>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { documentId } = context.query;

  if (!documentId || typeof documentId !== "string") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const document = await documentService.getFile(documentId);
    return {
      props: {
        initialDocument: {
          ...document,
          uploadedAt: document.uploadedAt.toISOString(),
        },
      },
    };
  } catch (error) {
    console.error("Error fetching document:", error);
    return {
      props: {
        error: "Failed to load document",
      },
    };
  }
};
