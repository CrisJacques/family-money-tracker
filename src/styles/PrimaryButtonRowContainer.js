import styled from "styled-components";

/**
 * O objetivo deste styled component é padronizar o aspecto visual de todos os botões principais da lista de transações (despesas ou receitas)
 */
const PrimaryButtonRowContainer = styled.button`
  background-color: #00675b;
  color: white;
  font-size: 1em;
  margin: 0.2em;
  padding: 0.2em 1.2em;
  border: 1.5px solid black;
  border-radius: 15px;
  cursor: pointer;
`;

export default PrimaryButtonRowContainer;
