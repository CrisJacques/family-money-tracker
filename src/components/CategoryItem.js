import React from "react";

/* Componente que tem a responsabilidade de construir itens da lista de categorias com seus valores totais para um dado período */
const CategoryItem = ({category, value}) => (
  <div>
    <div style={{ "display": "flex",  "justify-content": "space-between", "font-size": "1.05em", "padding-bottom": "0.4em"}}>
      <span>{category}</span>
      <span>R$ {value}</span>
    </div>
  </div>
);

export default CategoryItem;