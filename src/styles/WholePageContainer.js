import styled from "styled-components";

/**
 * O objetivo deste syled component é padronizar a estilização de cada uma das páginas como um todo, a fim de permitir que elas possam receber facilmente uma máscara de carregamento sobre elas quando for necessário (componente LoadingMask)
 */
const WholePageContainer = styled.div`
  position: absolute;

  @media only screen and (min-width: 1200px) {
    top: 36%;
    width: 65%;
  }

  @media only screen and (min-width: 1900px) {
    top: 25%;
    width: 55%;
  }
`;

export default WholePageContainer;
