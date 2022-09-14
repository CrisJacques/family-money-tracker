import styled from "styled-components";

/**
 * O objetivo deste styled component é padronizar a apresentação visual de todos os títulos de página que podem receber outros elementos na mesma linha
 */
const PageTitleContainerInline = styled.h4`
  font-family: "Roboto", sans-serif;
  font-weight: ExtraBold;
  color: black;
  font-size: 2em;
  display:inline-block;
  float:left;
`;

export default PageTitleContainerInline;
