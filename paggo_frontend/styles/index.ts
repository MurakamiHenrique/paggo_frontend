import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

    @font-face {
        font-family: "Poppins";
        font-weight: 400;
        font-style: normal;
        font-display: swap;
        src: local("Poppins"), url("/fonts/Poppins/Poppins-Regular.ttf") format('truetype');
    }
    @font-face {
        font-family: "Poppins";
        font-weight: 700;
        font-style: normal;
        font-display: swap;
        src: local("Poppins"), url("/fonts/Poppins/Poppins-Bold.ttf") format('truetype');
    }
    @font-face {
        font-family: "Poppins";
        font-weight: 900;
        font-style: normal;
        font-display: swap;
        src: local("Poppins"), url("/fonts/Poppins/Poppins-ExtraBold.ttf") format('truetype');
    }
    @font-face {
        font-family: "Poppins";
        font-weight: 300;
        font-style: normal;
        font-display: swap;
        src: local("Poppins"), url("/fonts/Poppins/Poppins-Light.ttf") format('truetype');
    }
    @font-face {
        font-family: "Poppins";
        font-weight: 200;
        font-style: normal;
        font-display: swap;
        src: local("Poppins"), url("/fonts/Poppins/Poppins-ExtraLight.ttf") format('truetype');
    }
    @font-face {
        font-family: "Poppins";
        font-weight: 300;
        font-style: italic;
        font-display: swap;
        src: local("Poppins"), url("/fonts/Poppins/Poppins-LightItalic.ttf") format('truetype');
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Poppins", sans-serif;
    }

    button {
        outline: none;
        border: none;
    }
`;
