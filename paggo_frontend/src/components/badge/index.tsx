import styled from "styled-components";
import { theme } from "../../theme";

export const Badge = styled.span<{
  $variant?: "default" | "success" | "error" | "warning";
}>`
  display: inline-flex;
  align-items: center;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 500;

  ${(props) => {
    switch (props.$variant) {
      case "success":
        return `
          background-color: ${theme.colors.success}20;
          color: ${theme.colors.success};
          border: 1px solid ${theme.colors.success}30;
        `;
      case "error":
        return `
          background-color: ${theme.colors.error}20;
          color: ${theme.colors.error};
          border: 1px solid ${theme.colors.error}30;
        `;
      case "warning":
        return `
          background-color: ${theme.colors.warning}20;
          color: ${theme.colors.warning};
          border: 1px solid ${theme.colors.warning}30;
        `;
      default:
        return `
          background-color: ${theme.colors.primary}20;
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary}30;
        `;
    }
  }}

  svg {
    width: 0.75rem;
    height: 0.75rem;
    margin-right: ${theme.spacing.xs};
  }
`;
