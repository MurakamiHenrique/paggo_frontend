import styled from "styled-components";
import { Upload, File } from "lucide-react";
import { theme } from "@/src/theme";

export const DropzoneContainer = styled.div<{ $isDragActive: boolean }>`
  border: 2px dashed
    ${(props) =>
      props.$isDragActive ? theme.colors.primary : theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xxl};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${(props) =>
    props.$isDragActive
      ? `${theme.colors.primary}10`
      : `${theme.colors.surface}50`};

  &:hover {
    border-color: ${(props) =>
      props.$isDragActive ? theme.colors.primary : theme.colors.borderHover};
  }
`;

export const UploadIcon = styled(Upload)`
  width: 4rem;
  height: 4rem;
  color: ${theme.colors.textMuted};
  margin: 0 auto ${theme.spacing.lg};
`;

export const Title = styled.h2`
  color: ${theme.colors.text};
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 ${theme.spacing.md} 0;
`;

export const Description = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 1.125rem;
  margin: 0 0 ${theme.spacing.md} 0;

  .highlight {
    color: ${theme.colors.primary};
  }
`;

export const FileInfo = styled.div`
  color: ${theme.colors.textMuted};
  font-size: 0.875rem;

  p {
    margin: ${theme.spacing.xs} 0;
  }
`;

export const ProcessingContainer = styled.div`
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  text-align: center;
`;

export const ProcessingIcon = styled(File)`
  width: 3rem;
  height: 3rem;
  color: ${theme.colors.primary};
  margin: 0 auto ${theme.spacing.md};
`;

export const ProcessingTitle = styled.h3`
  color: ${theme.colors.text};
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 ${theme.spacing.sm} 0;
`;

export const ProcessingText = styled.p`
  color: ${theme.colors.textSecondary};
  margin: 0 0 ${theme.spacing.lg} 0;
`;

export const ProgressText = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 0.875rem;
  text-align: center;
  margin: ${theme.spacing.sm} 0 0 0;
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.error}20;
  border: 1px solid ${theme.colors.error}30;
  margin-top: ${theme.spacing.md};
`;

export const ErrorText = styled.div`
  .title {
    color: ${theme.colors.error};
    font-weight: 500;
    margin: 0 0 ${theme.spacing.xs} 0;
  }

  .description {
    color: ${theme.colors.error};
    font-size: 0.875rem;
    margin: 0;
    opacity: 0.8;
  }
`;

export const Spinner = styled.div`
  width: 2rem;
  height: 2rem;
  border: 2px solid transparent;
  border-top: 2px solid ${theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
