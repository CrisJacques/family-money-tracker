import React from "react";

/**
 * Constrói itens da lista de categorias com seus valores totais para um dado período, em negrito
 * @param {String} category - Nome da categoria que deve ser exibida
 * @param {String} value - Valor correspondente à categoria
 * @returns Componente que exibe o nome e valor da categoria em negrito
 */
const BoldCategoryItem = ({ category, value }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          "justify-content": "space-between",
          "font-size": "1.05em",
          "padding-bottom": "0.4em",
        }}
      >
        <span>
          <b>{category}</b>
        </span>
        <span>
          <b>R$ {value}</b>
        </span>
      </div>
    </div>
  );
};

export default BoldCategoryItem;
