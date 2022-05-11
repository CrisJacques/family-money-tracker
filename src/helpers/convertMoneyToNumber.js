/**
 * Converte o valor monetário passado pelo frontend para número para poder utilizar este valor na requisição à API
 * @param {String} value - Valor monetário passado pelo frontend
 * @returns {String} Valor sem o prefixo "R$ " e com "." no lugar de ","
 */
const convertMoneyToNumber = (value) => {
  /* Transforma por exemplo R$ 1.245,68 em 1245.68 */
  return value.slice(3).replaceAll(".", "").replace(",", ".");
};

export default convertMoneyToNumber;
