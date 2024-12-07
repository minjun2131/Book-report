import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Reset CSS */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family: 'Arial', sans-serif;
    background-color: #fff;
    color: #333;
  }

  /* Remove default styles from list elements */
  ul, ol {
    list-style: none;
  }

  /* Reset link styles */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* Reset buttons */
  button {
    all: unset;
    cursor: pointer;
  }

  /* Add custom styles if necessary */
  img {
    max-width: 100%;
    display: block;
  }

  /* SweetAlert2 specific reset (optional, depends on the issue) */
  .swal2-icon {
    font-size: 24px !important; /* Ensure consistent size */
  }
`;

export default GlobalStyle;
