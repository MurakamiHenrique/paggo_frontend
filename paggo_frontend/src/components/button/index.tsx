import styled from "styled-components";
import { theme } from "../../theme";

export const Button = styled.button<{
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;

  ${(props) => {
    switch (props.size) {
      case "sm":
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: 0.875rem;
          height: 2rem;
        `;
      case "lg":
        return `
          padding: ${theme.spacing.md} ${theme.spacing.xl};
          font-size: 1.125rem;
          height: 3rem;
        `;
      default:
        return `
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: 1rem;
          height: 2.5rem;
        `;
    }
  }}

  ${(props) => {
    switch (props.variant) {
      case "outline":
        return `
          background-color: transparent;
          border: 1px solid ${theme.colors.border};
          color: ${theme.colors.text};
          
          &:hover:not(:disabled) {
            border-color: ${theme.colors.borderHover};
            background-color: ${theme.colors.surfaceHover};
          }
        `;
      case "ghost":
        return `
          background-color: transparent;
          color: ${theme.colors.textSecondary};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.surfaceHover};
            color: ${theme.colors.text};
          }
        `;
      default:
        return `
          background-color: ${theme.colors.primary};
          color: white;
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryHover};
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
