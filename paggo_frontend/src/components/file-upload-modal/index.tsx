import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { AlertCircle } from "lucide-react";
import type { ProcessedDocument, UploadStatus } from "@/src/interfaces";
import { documentService } from "@/src/services/document-service";
import { ProgressContainer, ProgressBar } from "@/src/components/progress";
import { theme } from "@/src/theme";
import * as S from "./styles";

interface FileUploadProps {
  onFileUploading: () => void;
  onFileProcessed: (documentId: string, fileName: string) => void;
}

export function FileUpload({
  onFileUploading,
  onFileProcessed,
}: FileUploadProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [currentFileName, setCurrentFileName] = useState("");

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      setCurrentFileName(file.name);
      setUploadStatus("uploading");
      onFileUploading();

      try {
        const response = await documentService.processFile(file);
        setUploadStatus("success");

        // Pass both documentId and fileName to parent
        onFileProcessed(response.documentId, file.name);

        setUploadProgress(0);
        setUploadStatus("idle");
        setCurrentFileName("");
      } catch (error) {
        setUploadStatus("error");
        console.error("Upload error:", error);
      }
    },
    [onFileUploading, onFileProcessed],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    accept: documentService.ACCEPTED_FILE_TYPES,
  });

  if (uploadStatus === "uploading" || uploadStatus === "processing") {
    return (
      <S.ProcessingContainer>
        <S.ProcessingIcon />
        <S.ProcessingTitle>{currentFileName}</S.ProcessingTitle>
        <S.ProcessingText>
          {uploadStatus === "uploading"
            ? "Uploading..."
            : "Processing with OCR..."}
        </S.ProcessingText>

        {uploadStatus === "uploading" ? (
          <div>
            <ProgressContainer>
              <ProgressBar value={uploadProgress} />
            </ProgressContainer>
            <S.ProgressText>{uploadProgress}% uploaded</S.ProgressText>
          </div>
        ) : (
          <S.Spinner />
        )}
      </S.ProcessingContainer>
    );
  }

  return (
    <div>
      <S.DropzoneContainer {...getRootProps()} $isDragActive={isDragActive}>
        <input {...getInputProps()} />
        <S.UploadIcon />
        <S.Title>
          {isDragActive ? "Drop your document here" : "Upload Document"}
        </S.Title>
        <S.Description>
          Drag & drop a file here, or{" "}
          <span className="highlight">click to browse</span>
        </S.Description>
        <S.FileInfo>
          <p>Supported formats:Images (PNG, JPG, JPEG) and PDF</p>
          <p>Maximum file size: 10MB</p>
        </S.FileInfo>
      </S.DropzoneContainer>

      {uploadStatus === "error" && (
        <S.ErrorContainer>
          <AlertCircle size={20} color={theme.colors.error} />
          <S.ErrorText>
            <p>Upload failed</p>
            <p>Please try again with a different file</p>
          </S.ErrorText>
        </S.ErrorContainer>
      )}
    </div>
  );
}
