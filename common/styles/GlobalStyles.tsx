import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --background: #1c2939;
    --primary: #444ce6;
    --primary-complement: orange;
    --white: #fff;
    --divider: #ccc;
    --grey: #2b2b2b;
    --black: #000;
    --red: #ca0c00;
  }

  input {
    box-sizing: border-box;
  }

  * {
    box-sizing: border-box;
  }
  
  html {
    background-attachment: fixed;
    font-size: 10px;
    font-family: Poppins;
  }
  
  body {
    font-size: 1.3rem;
    background: var(--background);
    color: var(--white);
  }

  h1,h2,h3,h4,h5,h6 {
    margin: 0;
  }

  .btn-primary-outline {
    border: 1.5px solid var(--primary);
    padding: 1rem;
    background-color: transparent;
    width: 100%;
    color: var(--primary);
    border-radius: 0.5rem;
    cursor: pointer;
  }

  .btn-default-outline {
    border: 1.5px solid var(--grey);
    padding: 1rem;
    background-color: transparent;
    width: 100%;
    color: var(--grey);
    border-radius: 0.5rem;
    cursor: pointer;
  }

  .grid-1-1 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
  }

  .flex {
    display: flex;
  }

  .jcsb {
    justify-content: space-between;
  }

  .btn-primary {
    border: 1.5px solid var(--primary);
    background-color: var(--primary);
    outline-color: var(--red);
    padding: 1rem;
    width: 100%;
    color: var(--white);
    border-radius: 0.5rem;
    cursor: pointer;
  }

  .btn-danger {
    border: 1.5px solid var(--red);
    background-color: var(--red);
    padding: 1rem;
    width: 100%;
    color: var(--white);
    border-radius: 0.5rem;
    cursor: pointer;
  }

  hr {
    background-color: var(--divider);
    border: none;
    height: 1px;
  }

`;

export default GlobalStyles;
