import React from "react";

/* Componente que tem a responsabilidade de construir itens da lista de transações recentes, que ficam na tela inicial da aplicação */
const TransactionItem = ({description, value, category, date}) => (
  <div>
    <div style={{ "display": "flex",  "justify-content": "space-between", "font-size": "1.05em"}}>
      <span>{description}</span>
      <span>R$ {value}</span>
    </div>
    <div style={{ "display": "flex",  "justify-content": "space-between", "font-size": "0.85em", "font-style": "italic", "padding-bottom": "0.4em"}}>
      <span>{category}</span>
      <span>{date}</span>
    </div>
  </div>
);

export default TransactionItem;
