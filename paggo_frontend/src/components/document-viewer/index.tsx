import { Download, Upload, FileText, Calendar, HardDrive } from "lucide-react";
import type { ProcessedDocument } from "@/src/interfaces";
import { Card, CardHeader, CardContent } from "@/src/components/card";
import { Button } from "../button";
import * as S from "./styles";

interface DocumentViewerProps {
  document: ProcessedDocument;
  onNewUpload: () => void;
}

export function DocumentViewer({ document, onNewUpload }: DocumentViewerProps) {
  const handleDownload = () => {
    const content = `Document: ${document.fileName}
Processed: ${document.uploadedAt.toLocaleString()}

EXTRACTED TEXT:
${document.extractedText}`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = globalThis.document.createElement("a");
    a.href = url;
    a.download = `${document.fileName.split(".")[0]}_extracted.txt`;
    globalThis.document.body.appendChild(a);
    a.click();
    globalThis.document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <S.HeaderContainer>
          <S.DocumentInfo>
            <S.IconContainer>
              <FileText size={24} />
            </S.IconContainer>
            <S.InfoContent>
              <S.DocumentTitleContainer>
                <S.DocumentTitle>{document.fileName}</S.DocumentTitle>
              </S.DocumentTitleContainer>
              <S.MetaInfo>
                <S.MetaItem>
                  <Calendar size={12} />
                  <span>
                    {document.uploadedAt.toLocaleString("pt-BR", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </S.MetaItem>
                <S.MetaItem>
                  <HardDrive size={12} />
                  <span>{(document.size / 1024 / 1024).toFixed(2)} MB</span>
                </S.MetaItem>
              </S.MetaInfo>
            </S.InfoContent>
          </S.DocumentInfo>
          <S.ActionButtons>
            <S.DownloadButton variant="outline" size="md" onClick={handleDownload}>
              <Download size={18} />
              Download OCR
            </S.DownloadButton>
          </S.ActionButtons>
        </S.HeaderContainer>
      </CardHeader>
      <CardContent>
        <S.TextContainer>
          <S.SectionTitle>Extracted Text (OCR)</S.SectionTitle>
          <S.TextContent>
            <S.ExtractedText>{document.extractedText}</S.ExtractedText>
          </S.TextContent>
        </S.TextContainer>
      </CardContent>
    </Card>
  );
}
