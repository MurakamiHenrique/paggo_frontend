import styled from "styled-components";
import { theme } from "@/src/theme";
import { Button } from "../button";

export const HeaderContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const DocumentInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
`;

export const IconContainer = styled.div`
  color: ${theme.colors.primary};
  margin-top: ${theme.spacing.xs};
`;

export const InfoContent = styled.div``;

export const DocumentTitleContainer = styled.div`
  display: flex;
  max-width: 18rem;
  overflow: hidden;
`;
export const DocumentTitle = styled.h2`
  color: ${theme.colors.text};
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 ${theme.spacing.sm} 0;
`;

export const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  color: ${theme.colors.textSecondary};
  font-size: 0.875rem;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

export const TextContainer = styled.div`
  max-height: 32rem;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: ${theme.colors.surfaceHover} transparent;
`;

export const SectionTitle = styled.h3`
  color: ${theme.colors.textSecondary};
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 ${theme.spacing.md} 0;
`;

export const TextContent = styled.div`
  background-color: ${theme.colors.surfaceHover};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
`;

export const ExtractedText = styled.pre`
  color: ${theme.colors.text};
  white-space: pre-wrap;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
`;

export const DownloadButton = styled(Button)`
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0;
  width: 160px;
  svg {
    margin-right: ${theme.spacing.sm};
  }
`;
