import styled from "styled-components";
import { theme } from "../../theme";

export const Card = styled.div`
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
`;

export const CardHeader = styled.div`
  padding: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.border};
`;

export const CardContent = styled.div`
  padding: ${theme.spacing.lg};
`;

export const CardTitle = styled.h3`
  color: ${theme.colors.text};
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
`;
