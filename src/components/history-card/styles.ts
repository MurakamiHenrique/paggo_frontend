import styled from "styled-components";
import { theme } from "@/src/theme";
import { Trash2 } from "lucide-react";

export const DocumentItem = styled.div<{ isActive: boolean }>`
  background-color: ${theme.colors.surfaceHover};
  border: 1px solid
    ${(props) => (props.isActive ? theme.colors.primary : theme.colors.border)};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${(props) =>
      props.isActive ? theme.colors.primaryHover : theme.colors.borderHover};
  }

  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
`;
export const UploadDate = styled.div`
  display: flex;
  align-items: flex-start;
  color: ${theme.colors.textMuted};
  font-size: 0.75rem;
`;
export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
    color: ${theme.colors.error};
  }
`;
export const DocumentHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.sm};
`;

export const NameIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

export const DocumentNameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.sm};
  height: fit-content;
  width: 100%;
  justify-content: space-between;
`;
export const DocumentTitleContainer = styled.div`
  max-width: 11rem;
  font-size: 0.8rem;
  overflow: hidden;
`;

export const DocumentIcon = styled.div`
  color: ${theme.colors.primary};
  flex-shrink: 0;
  margin-top: ${theme.spacing.xs};
`;

export const DocumentInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const DocumentName = styled.h3`
  color: ${theme.colors.text};
  font-size: 0.8rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DocumentMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.textSecondary};
  font-size: 0.75rem;
`;

export const DocumentStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.sm};
`;
export const StatsLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

export const CardInfos = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${theme.spacing.lg};
`;

export const FileSize = styled.div`
  color: ${theme.colors.textMuted};
  font-size: 0.75rem;
`;
export const ChatLabel = styled.p`
  color: ${theme.colors.primary};
  font-size: 0.75rem;
  font-weight: 500;
  margin: 0 0 ${theme.spacing.xs} 0;
`;

export const ChatText = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 0.75rem;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
