import { createGlobalStyle } from 'styled-components';
import { theme } from '../theme';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${theme.colors.background};
    background-image: ${theme.gradients.background};
    color: ${theme.colors.text};
    line-height: 1.6;
  }

  #root {
    min-height: 100vh;
    width: 100%;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
  }

  input, textarea {
    font-family: inherit;
  }

  /* Polish character support */
  @font-face {
    font-family: 'Polish';
    src: local('Arial'), local('Helvetica');
    unicode-range: U+0104-0105, U+0106-0107, U+0118-0119, U+0141-0142, U+0143-0144, U+0150-0151, U+0179-017A, U+017B-017C, U+00D3, U+00F3, U+00F1, U+00F6;
  }
`;

