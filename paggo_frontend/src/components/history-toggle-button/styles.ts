import styled from "styled-components";
import { theme } from "@/src/theme";

export const CountBadge = styled.span`
  margin-left: ${theme.spacing.sm};
  background-color: ${theme.colors.primary};
  color: white;
  font-size: 0.75rem;
  border-radius: 50%;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  min-width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
