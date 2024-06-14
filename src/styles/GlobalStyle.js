import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    font-family: 'IBM Plex Sans KR', sans-serif;
    background-color: #f4f3ea;
    color: #354649;
    margin: 0;
    padding: 0;
  }

  #root {
    padding: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  input, select {
    background-color: #f4f3ea;
    color: #354649;
  }
`;

export default GlobalStyle;
