import { FileText, Trash2 } from "lucide-react";
import { useRouter } from "next/router";
import type { ProcessedDocument } from "@/src/interfaces";
import * as S from "./styles";
import { documentService } from "@/src/services/document-service";

interface HistoryDocumentProps {
  document: ProcessedDocument;
  currentDocumentId?: string;
  onSelectDocument: (document: ProcessedDocument) => void;
  onDelete?: (documentId: string) => void;
}

export function HistoryCard({
  document,
  currentDocumentId,
  onSelectDocument,
  onDelete,
}: HistoryDocumentProps) {
  const router = useRouter();

  const handleClick = () => {
    onSelectDocument(document);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await documentService.deleteDocument(document.id);
      onDelete?.(document.id);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <S.DocumentItem
      isActive={currentDocumentId === document.id}
      onClick={handleClick}
    >
      <S.DocumentInfo>
        <S.DocumentNameContainer>
          <S.NameIconContainer>
            <S.DocumentIcon>
              <FileText size={20} />
            </S.DocumentIcon>
            <S.DocumentTitleContainer>
              <S.DocumentName title={document.fileName}>
                {document.fileName}
              </S.DocumentName>
            </S.DocumentTitleContainer>
          </S.NameIconContainer>
          <S.DeleteButton onClick={handleDelete}>
            <Trash2 size={16} />
          </S.DeleteButton>
        </S.DocumentNameContainer>
        <S.CardInfos>
          <S.UploadDate>
            {new Date(document.uploadedAt).toLocaleString("pt-BR", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </S.UploadDate>

          <S.FileSize>
            {document.size ? `${(document.size / 1024).toFixed(2)} KB` : "N/A"}
          </S.FileSize>
        </S.CardInfos>
      </S.DocumentInfo>
    </S.DocumentItem>
  );
}
