import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  * {
    padding: 0;
    margin: 0;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
    outline: none;
  }


  a {
    text-decoration: none;
    font-size: inherit;
    color: inherit;
    cursor: pointer;
  }

  button {
    background-color: transparent;
    color: inherit;
    border-width: 0;
    padding: 0;
    cursor: pointer;
  }

  a:hover,
  a:active,
  button:hover,
  button:active {
    // 메인 컬러 정하기
    // color: #33c1ff;
  }

  figure {
    margin: 0;
  }

  input::-moz-focus-inner {
    border: 0;
    padding: 0;
    margin: 0;
  }

  ul,
  ol,
  dd {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
  }

  p {
    margin: 0;
  }

  cite {
    font-style: normal;
  }
  
  fieldset {
    border-width: 0;
    padding: 0;
    margin: 0;
  }
  body {
    height: 100%;
    background-color: #181820;
  }
  body, div {
    font-size: 18px;
    font-family: 'Pretendard';
  }

  span, h1, h2, h3, h4, h5, p, input, label, button, textarea, ul, li {
    font-size: inherit;
    font-family: 'Pretendard';
  }

  main {
    display: block;
  }

  strong {
    font-weight: 600;
    word-break: break-all;
  }

`;
