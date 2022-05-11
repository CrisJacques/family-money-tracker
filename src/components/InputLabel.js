import React from "react";

import LabelFieldContainer from "../styles/LabelFieldContainer";

/**
 * Constrói o label de todos os campos de formulário da aplicação
 * @param {String} id - Id do campo de formulário ao qual o label deve se referir
 * @param {String} name - Texto que deve ser exibido no label
 * @returns Componente de label de campo de formulário
 */
const InputLabel = ({ id, name }) => (
  <LabelFieldContainer>
    <label htmlFor={`${id}`}>{name}</label>
  </LabelFieldContainer>
);

export default InputLabel;
