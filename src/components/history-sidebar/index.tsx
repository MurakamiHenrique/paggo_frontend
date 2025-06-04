import type { ProcessedDocument } from "../../interfaces";
import * as S from "./styles";
import { HistoryCard } from "../history-card";

interface HistorySidebarProps {
  show: boolean;
  documents: ProcessedDocument[];
  onSelectDocument: (document: ProcessedDocument) => void;
  onDeleteDocument?: (documentId: string) => void;
  currentDocumentId?: string;
}

export function HistorySidebar({
  show,
  documents,
  currentDocumentId,
  onSelectDocument,
  onDeleteDocument,
}: HistorySidebarProps) {
  return (
    <S.SidebarContainer $show={show}>
      <S.Header>
        <S.Title>Document History</S.Title>
        <S.Subtitle>
          {documents.length} document{documents.length !== 1 ? "s" : ""}
        </S.Subtitle>
      </S.Header>

      <S.DocumentsList>
        {documents.length === 0 ? (
          <S.EmptyState>
            <S.EmptyIcon />
            <S.EmptyTitle>No documents yet</S.EmptyTitle>
            <S.EmptySubtitle>
              Upload your first document to see it here
            </S.EmptySubtitle>
          </S.EmptyState>
        ) : (
          documents.map((document) => (
            <HistoryCard
              key={document.id}
              document={document}
              currentDocumentId={currentDocumentId}
              onSelectDocument={onSelectDocument}
              onDelete={onDeleteDocument}
            />
          ))
        )}
      </S.DocumentsList>
    </S.SidebarContainer>
  );
}
