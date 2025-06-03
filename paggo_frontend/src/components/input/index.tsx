import styled from "styled-components";
import { theme } from "../../theme";

export const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.surfaceHover};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text};
  font-size: 1rem;
  autocomplete: off;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }

  &::placeholder {
    color: ${theme.colors.textMuted};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing.sm};
`;
