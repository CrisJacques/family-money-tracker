import React from "react";

/**
 * Constrói itens da lista de categorias com seus valores totais (já com duas casas decimais) para um dado período
 * @param {String} category - Nome da categoria que deve ser exibida
 * @param {String} value - Valor correspondente à categoria
 * @returns Componente que exibe o nome e valor da categoria
 */
const CategoryItem = ({ category, value }) => (
  <div>
    <div
      style={{
        display: "flex",
        "justify-content": "space-between",
        "font-size": "1.05em",
        "padding-bottom": "0.4em",
      }}
    >
      <span>{category}</span>
      <span>R$ {value.toFixed(2)}</span>
    </div>
  </div>
);

export default CategoryItem;
