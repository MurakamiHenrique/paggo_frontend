import styled from "styled-components";
import { theme } from "../../theme";

export const Container = styled.div`
  max-width: 95vw;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

export const MainLayout = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.background};
  display: flex;
  max-height: fit-content;
`;

export const ContentArea = styled.div`
  flex: 1;
  padding: ${theme.spacing.xl};
`;
