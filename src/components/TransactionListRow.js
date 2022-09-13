import React from "react";

import PrimaryButtonRowContainer from "../styles/PrimaryButtonRowContainer";
import SecondaryButtonRowContainer from "../styles/SecondaryButtonRowContainer";

/**
 * Constrói uma linha da lista de transações (despesas ou receitas)
 * @param {String} date - Data da transação
 * @param {String} description - Descrição da transação
 * @param {String} category - Nome da categoria da transação
 * @param {String} value - Valor da transação
 * @returns Componente que exibe os valores das colunas da lista de despesas e receitas
 */
const TransactionListRow = ({ date, description, category, value }) => (
  <tr>
    <td>{date}</td>
    <td>{description}</td>
    <td>{category}</td>
    <td>R$ {value.toFixed(2)}</td>
    <td>
      <PrimaryButtonRowContainer>Editar</PrimaryButtonRowContainer>
      <SecondaryButtonRowContainer>Remover</SecondaryButtonRowContainer>
    </td>
  </tr>
);

export default TransactionListRow;
