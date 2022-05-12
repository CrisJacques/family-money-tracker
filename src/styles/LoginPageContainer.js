import styled from "styled-components";

/**
 * O objetivo deste styled component é configurar a imagem de fundo da tela de login
 */
const LoginPageContainer = styled.div`
  position: relative;
  background-image: url(${require(`../images/background.jpg`)});
  background-color: #cccccc;
  background-size: cover;
  height: 100vh;
`;

export default LoginPageContainer;
