"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    background-color: #f3f4f6;
    color: #1f2937;
    line-height: 1.5;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  /* Better touch targets on mobile */
  @media (max-width: 768px) {
    button, a {
      min-height: 44px;
      min-width: 44px;
    }
  }

  /* Prevent horizontal scroll */
  html, body {
    overflow-x: hidden;
    width: 100%;
  }
`;
