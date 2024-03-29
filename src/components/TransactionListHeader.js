import React from "react";

/**
 * Constrói o header da lista de despesas e de receitas
 * @returns Componente que exibe os nomes das colunas da lista de despesas e de receitas
 */
const TransactionListHeader = () => (
    <thead>
    <tr>
        <th>Data</th>
        <th>Descrição</th>
        <th>Valor</th>
        <th>Ações</th>
    </tr>
  </thead>
);

export default TransactionListHeader;