import styled from "styled-components";
import { theme } from "../../theme";

export const Header = styled.div`
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const HeaderText = styled.div`
  text-align: center;
  flex: 1;
`;

export const Title = styled.h1`
  color: ${theme.colors.text};
  font-size: 2rem;
  font-weight: 700;
`;

export const Description = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 1.125rem;
  margin: 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 8rem;
`;

export const UploadContainer = styled.div`
  max-width: 42rem;
  margin: 0 auto;
`;

export const ProcessingContainer = styled.div`
  max-width: 42rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

export const WorkspaceGrid = styled.div`
  height: 80vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const LogoutButton = styled.button`
  background-color: ${theme.colors.primary};
  color: white;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${theme.colors.primaryHover};
  }
`;
