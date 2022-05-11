import React from "react";

import actualMonth from "../helpers/actualMonth";

/**
 * Informa o mês e ano atual na tela inicial
 * @returns Componente com o mês e ano atual
 */
const ActualMonthAndYear = () => {
  const actualMonthAndYear = actualMonth();

  return <div>{actualMonthAndYear}</div>;
};

export default ActualMonthAndYear;
