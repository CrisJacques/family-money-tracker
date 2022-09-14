import React from "react";

import PrimaryButtonRowContainer from "../styles/PrimaryButtonRowContainer";

/**
 * Constrói um seletor de data com data inicial e final já configuradas no momento da abertura da tela
 * @param {String} initialDate - Data inicial padrão quando a tela é aberta
 * @param {String} finalDate - Data final padrão quando a tela é aberta
 * @returns Componente que exibe 2 campos para seleção de data com uma frase que os conecta
 */
const DateFilterSelector = () => {
  var today = new Date().toISOString().substring(0,10); // dia atual, formatado para ser usado no input de data logo abaixo (formato aaaa-mm-dd)
  var lastWeek = new Date(new Date().setDate(new Date().getDate() - 5)).toISOString().substring(0,10); // 5 dias atrás, formatado para ser usado no input de data logo abaixo (formato aaaa-mm-dd)

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <span
        style={{
          "margin-right": "1em",
          "margin-left": "0",
          "margin-bottom": "auto",
          "margin-top": "auto",
          "font-size": "1.1em",
        }}
      >
        Buscar dados de:
      </span>
      <input
        type="date"
        name="initialDate"
        defaultValue={`${lastWeek}`}
        style={{
          width: "12%",
        }}
      />
      <span
        style={{
          "margin-right": "1em",
          "margin-left": "1em",
          "margin-bottom": "auto",
          "margin-top": "auto",
          "font-size": "1.1em",
        }}
      >
        até:
      </span>
      <input
        type="date"
        name="initialDate"
        defaultValue={`${today}`}
        style={{
          width: "12%",
          "margin-right": "1em",
        }}
      />
      <PrimaryButtonRowContainer>OK</PrimaryButtonRowContainer>
    </div>
  );
}

export default DateFilterSelector;
