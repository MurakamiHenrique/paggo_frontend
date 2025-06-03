import styled from "styled-components";
import { theme } from "../../theme";

export const ProgressContainer = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: ${theme.colors.surfaceHover};
  border-radius: ${theme.borderRadius.sm};
  overflow: hidden;
`;

export const ProgressBar = styled.div<{ value: number }>`
  height: 100%;
  background-color: ${theme.colors.primary};
  width: ${(props) => props.value}%;
  transition: width 0.3s ease;
`;
