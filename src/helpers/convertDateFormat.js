/**
 * Converte o formato de data de aaaa-mm-dd para dd/mm/aaaa
 * @param {String} data - Data no formato aaaa-mm-dd
 * @returns {String} Data no formato dd/mm/aaaa
 */
const convertDateFormat = (data) => {
  var ano  = data.split("-")[0];
  var mes  = data.split("-")[1];
  var dia  = data.split("-")[2];

  return `${dia}/${mes}/${ano}`;
};

export default convertDateFormat;
