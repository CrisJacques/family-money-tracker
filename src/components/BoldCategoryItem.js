import React from "react";

/* Componente que tem a responsabilidade de construir itens da lista de categorias com seus valores totais para um dado período, em negrito */
const BoldCategoryItem = ({category, value}) => {
  return(
  <div>
    <div style={{ "display": "flex",  "justify-content": "space-between", "font-size": "1.05em", "padding-bottom": "0.4em"}}>
      <span><b>{category}</b></span>
      <span><b>R$ {value}</b></span>
    </div>
  </div>
);
  }

export default BoldCategoryItem;