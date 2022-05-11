import React from "react";

/**
 * Constrói itens das listas de despesas e receitas recentes, que ficam na tela inicial da aplicação
 * @param {String} description - Descrição da transação
 * @param {String} value - Valor da transação
 * @param {String} category - Nome da categoria da transação
 * @param {String} date - Data da transação
 * @returns Componente que exibe todas as informações de uma dada transação (descrição e valor na primeira linha; categoria e data na segunda linha)
 */
const TransactionItem = ({ description, value, category, date }) => (
  <div>
    <div
      style={{
        display: "flex",
        "justify-content": "space-between",
        "font-size": "1.05em",
      }}
    >
      <span>{description}</span>
      <span>R$ {value.toFixed(2)}</span>
    </div>
    <div
      style={{
        display: "flex",
        "justify-content": "space-between",
        "font-size": "0.85em",
        "font-style": "italic",
        "padding-bottom": "0.4em",
      }}
    >
      <span>{category}</span>
      <span>{date}</span>
    </div>
  </div>
);

export default TransactionItem;
