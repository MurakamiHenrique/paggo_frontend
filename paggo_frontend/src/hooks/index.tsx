import { ThemeProvider } from "styled-components";
import { theme } from "../theme";
import { AuthProvider } from "../hooks/use-auth";

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AuthProvider>
  );
};

export default AppProvider;
