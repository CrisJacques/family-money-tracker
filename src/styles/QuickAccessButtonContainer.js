import styled from "styled-components";

/**
 * O objetivo deste styled component é estilizar cada botão de acesso rápido da tela inicial da aplicação
 */
const QuickAccessButtonContainer = styled.div`
  font-family: "Roboto", sans-serif;
  color: black;
  border: 1.5px solid #9c9898;
  border-radius: 16px;
  padding: 0.3em;
  background: white;
  margin-right: 1.2em;
  margin-left: 1.2em;
  margin-bottom: 0.4em;
  width: 25%;
  cursor: pointer;
  text-align: center;
  display: inline-block;
`;

export default QuickAccessButtonContainer;
