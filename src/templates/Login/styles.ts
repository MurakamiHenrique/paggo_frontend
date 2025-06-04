import styled from "styled-components";
import { theme } from "../../theme";
import { Input } from "@/src/components/input";

export const LoginContainer = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  width: 100%;
  max-width: 400px;
  box-shadow: ${theme.shadows.lg};
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: ${theme.spacing.xs};
`;

export const EyeButton = styled.button`
  position: absolute;
  right: ${theme.spacing.sm};
  background: none;
  border: none;
  padding: ${theme.spacing.xs};
  color: ${theme.colors.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: ${theme.colors.text};
  }

  &:focus {
    outline: none;
  }
`;

export const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing.md};
`;

export const Description = styled.p`
  color: ${theme.colors.textSecondary};
  margin-top: ${theme.spacing.sm};
`;

export const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${theme.colors.border};
  margin-bottom: ${theme.spacing.lg};
`;

export const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: ${theme.spacing.md};
  color: ${(props) =>
    props.active ? theme.colors.primary : theme.colors.textSecondary};
  border-bottom: 2px solid
    ${(props) => (props.active ? theme.colors.primary : "transparent")};
  background: none;
  border-left: none;
  border-right: none;
  border-top: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${(props) =>
      props.active ? theme.colors.primary : theme.colors.text};
  }
`;

export const SignInInput = styled(Input)`
  margin-top: ${theme.spacing.xs};
  autocomplete: off;

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: ${theme.colors.text};
    -webkit-box-shadow: 0 0 0px 1000px ${theme.colors.surface} inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

export const SignUpInput = styled(Input)`
  margin-top: ${theme.spacing.xs};

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: ${theme.colors.text};
    -webkit-box-shadow: 0 0 0px 1000px ${theme.colors.surface} inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

export const LoginPage = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.background};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.error};
  font-size: 0.875rem;
  padding: ${theme.spacing.sm};
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.sm};
`;
