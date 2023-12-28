import { css } from '@emotion/react';

export const fgColor = '#333'
export const bgColor = '#f0f0f0'

export const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');

  :root {
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    display: flex;
    place-items: center;
    font-family: "Nunito", sans-serif;
    background-color: ${bgColor};
    color: ${fgColor};
    min-width: 320px;
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }

  img {
    width: 289px;
    height: 69px;
    margin-bottom: 1em;
  }

  p {
    margin-bottom: 0;  
  }

  #root {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }  
`;

