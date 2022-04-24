import React from "react";

import LabelFieldContainer from "../styles/LabelFieldContainer";

/* Componente que tem a responsabilidade de ser o label de todos os campos de formulário da aplicação */
const InputLabel = ({ id, name }) => (
  <LabelFieldContainer>
    <label htmlFor={`${id}`}>{name}</label>
  </LabelFieldContainer>
);

export default InputLabel;
