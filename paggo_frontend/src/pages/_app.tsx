import AppProvider from "../hooks";
import type { AppProps } from "next/app";
import { GlobalStyles } from "@/styles";
import isValidProp from "@emotion/is-prop-valid";
import { StyleSheetManager } from "styled-components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyleSheetManager shouldForwardProp={isValidProp}>
      <AppProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </AppProvider>
    </StyleSheetManager>
  );
}
export default MyApp;
