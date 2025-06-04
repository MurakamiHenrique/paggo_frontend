import styled from "styled-components";
import { theme } from "../../theme";

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md};
`;

export const HeaderText = styled.div`
  text-align: center;
  flex: 1;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 8rem;
`;

export const Header = styled.div`
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 0;
`;

export const Title = styled.h1`
  color: ${theme.colors.text};
  font-size: 2.25rem;
  font-weight: 700;
  margin: 0 0 ${theme.spacing.sm} 0;
`;

export const Description = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 1.125rem;
  margin: 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

export const UploadContainer = styled.div`
  width: 60vw;
  height: 50vh;
  margin: 0 auto;
`;

export const ProcessingContainer = styled.div`
  max-width: 42rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

export const WorkspaceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const HistoryButtonContainer = styled.div`
  margin-top: 36px;
  margin-left: 40px;
  z-index: 1000;
  width: 0px;
  height: 0px;
`;
export const LoadingContainer = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
`;
