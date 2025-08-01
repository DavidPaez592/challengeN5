import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f5f5f5;
    color: #333;
  }

  button {
    margin-right: 8px;
    padding: 6px 12px;
    cursor: pointer;
  }
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f5f5f5;
    color: #222;
  }

  h1, h2, h3, p {
    margin: 0;
    padding: 0;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }
`;
