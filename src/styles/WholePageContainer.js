import styled from "styled-components";

/* O objetivo deste syled component é padronizar a estilização de cada uma das páginas como um todo, a fim de permitir que elas possam receber facilmente uma máscara de carregamento sobre elas quando for necessário (componente LoadingMask) */
const WholePageContainer = styled.div`
  background-color: pink;
  position: absolute;

  @media only screen and (min-width: 1200px) {
    background-color: lavender;
    top: 36%;
    width: 65%;
  }

  @media only screen and (min-width: 1900px) {
    background-color: blue;
    top: 25%;
    width: 55%;
  }
`;

export default WholePageContainer;
