import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
@import url("https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.1/packages/wanted-sans/fonts/webfonts/variable/complete/WantedSansVariable.min.css");
${reset}

html {
  font-size: 62.5%;
}

body {
  font-size: 1.6rem;
  -ms-overflow-style: none;
}

::-webkit-scrollbar {
  display: none;
}

body * {
  box-sizing: border-box;
  font-family: "Wanted Sans Variable", "Wanted Sans", -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
}

h1, h2, h3, h4, p {
  margin-bottom: 12px;
}

#root {
 background-color: #fdfdfd;
}

#root * {
}

main {
  margin: 0 auto;
}

h1 {
  font-size: 3.2rem;
  font-weight: 900;
}

h2 {
  font-size: 2.4rem;
  font-weight: 700;
}

textarea {
  resize: none;
}
`;

export const StSection = styled.section`
  position: relative;
  max-width: 930px;
  padding: 0 24px;
  margin: 0 auto;
`;

export default GlobalStyle;
