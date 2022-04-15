import React from "react";

import LabelFieldContainer from "../styles/LabelFieldContainer";

const InputLabel = ({ id, name }) => (
      <LabelFieldContainer>
        <label htmlFor={`${id}`}>{name}</label>
      </LabelFieldContainer>
  );

export default InputLabel;