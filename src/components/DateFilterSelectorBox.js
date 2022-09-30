import React from "react";

import PrimaryButtonRowContainer from "../styles/PrimaryButtonRowContainer";

/**
 * Constrói um seletor de data com data inicial e final já configuradas no momento da abertura da tela (e que será exibido em uma caixa)
 * @param {String} startValue - Nome da variável de estado que armazena a nova data de início selecionada pelo usuário
 * @param {String} startOnChange - Nome do método que deve ser chamado para atualizar o estado do campo de data de início do período selecionado pelo usuário
 * @param {String} endValue - Nome da variável de estado que armazena a nova data final selecionada pelo usuário
 * @param {String} endOnChange - Nome do método que deve ser chamado para atualizar o estado do campo de data final do período selecionado pelo usuário
 * @param {String} onClickOk - Nome da função que deve ser chamada ao clicar no OK
 * @returns Componente que exibe 2 campos para seleção de data com uma frase que os conecta, dentro de uma caixa responsiva
 */
const DateFilterSelectorBox = ({
  startValue,
  startOnChange,
  endValue,
  endOnChange,
  onClickOk,
}) => {
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
        De:
      </span>
      <input
        type="date"
        name="initialDate"
        value={startValue}
        onChange={startOnChange}
        style={{
          width: "75%",
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
        value={endValue}
        onChange={endOnChange}
        style={{
          width: "75%",
          "margin-right": "1em",
        }}
      />
      <div
        style={{
          "margin-right": "1em",
          "margin-left": "1em",
          "margin-bottom": "auto",
          "margin-top": "auto",
          "font-size": "1.1em",
        }}
        onClick={onClickOk}
      >
        <PrimaryButtonRowContainer>OK</PrimaryButtonRowContainer>
      </div>
    </div>
  );
};

export default DateFilterSelectorBox;
