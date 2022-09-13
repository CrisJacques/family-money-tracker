import styled from "styled-components";

/**
 * O objetivo deste styled component é padronizar o aspecto visual de todos os botões secundários da lista de transações (despesas ou receitas)
 */
const SecondaryButtonRowContainer = styled.div`
  background: white;
  color: #00675b;
  font-size: 1em;
  margin: 0.2em;
  padding: 0.3em 1.2em;
  border: 1.5px solid black;
  border-radius: 15px;
  cursor: pointer;
  display: inline;
`;

export default SecondaryButtonRowContainer;
