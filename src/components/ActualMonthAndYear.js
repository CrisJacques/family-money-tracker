import React from "react";

import actualMonth from "../helpers/actualMonth";

/* Componente que tem a responsabilidade de informar o mês e ano atual na tela inicial */
const ActualMonthAndYear = () => {
  const actualMonthAndYear = actualMonth();

  return <div>{actualMonthAndYear}</div>;
};

export default ActualMonthAndYear;
