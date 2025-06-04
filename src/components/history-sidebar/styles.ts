import styled from "styled-components";
import { theme } from "@/src/theme";
import { FileText } from "lucide-react";

export const SidebarContainer = styled.div<{ $show: boolean }>`
  width: ${(props) => (props.$show ? "20rem" : "0")};
  transition: width 0.3s ease;
  overflow: hidden;
  border-right: 1px solid ${theme.colors.border};
  background-color: ${theme.colors.surface};
  display: flex;
  flex-direction: column;
  height: 100vh;
  scrollbar-width: thin;
  scrollbar-color: ${theme.colors.surfaceHover} transparent;
  position: sticky;
  top: 0;
`;
export const DocumentsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

export const Header = styled.div`
  padding: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.border};
`;

export const Title = styled.h2`
  color: ${theme.colors.text};
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 ${theme.spacing.sm} 0;
`;

export const Subtitle = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 0.875rem;
  margin: 0;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
`;

export const EmptyIcon = styled(FileText)`
  width: 3rem;
  height: 3rem;
  color: ${theme.colors.textMuted};
  margin: 0 auto ${theme.spacing.md};
`;

export const EmptyTitle = styled.p`
  color: ${theme.colors.textSecondary};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

export const EmptySubtitle = styled.p`
  color: ${theme.colors.textMuted};
  font-size: 0.875rem;
  margin: 0;
`;

export const Footer = styled.div`
  padding: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.border};
`;
