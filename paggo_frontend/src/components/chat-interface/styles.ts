import styled from "styled-components";
import { Button } from "../button";
import { theme } from "../../theme";

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

export const HeaderTitle = styled.h3`
  color: ${theme.colors.text};
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

export const MessagesContainer = styled.div`
  height: 26rem;
  overflow-y: auto;
  padding: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  scrollbar-width: thin;
  scrollbar-color: ${theme.colors.surfaceHover} transparent;
`;

export const MessageContainer = styled.div<{ isUser: boolean }>`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
`;

export const Avatar = styled.div<{ isUser: boolean }>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${(props) =>
    props.isUser ? theme.colors.border : theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const MessageBubble = styled.div<{ isUser: boolean }>`
  max-width: 80%;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  background-color: ${(props) =>
    props.isUser ? theme.colors.primary : theme.colors.surfaceHover};
  color: ${(props) => (props.isUser ? "white" : theme.colors.text)};
`;

export const MessageText = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
  white-space: pre-wrap;
  margin: 0 0 ${theme.spacing.sm} 0;
`;

export const MessageTime = styled.p`
  font-size: 0.75rem;
  opacity: 0.7;
  margin: 0;
`;

export const TypingContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-start;
`;

export const TypingBubble = styled.div`
  background-color: ${theme.colors.surfaceHover};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  display: flex;
  gap: ${theme.spacing.xs};
`;

export const TypingDot = styled.div<{ delay: number }>`
  width: 0.5rem;
  height: 0.5rem;
  background-color: ${theme.colors.textMuted};
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out;
  animation-delay: ${(props) => props.delay}s;

  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-0.5rem);
    }
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.md};
  gap: ${theme.spacing.md};
`;
