/**
 * Converte o formato em que as informações vem do backend para um formato que possa ser passado diretamente aos gráficos
 * @param {String} data - Json com pares categoria:valor vindo diretamente do backend
 * @returns {Array} Lista de objetos com nome e valor, no formato aceito pelos gráficos de rosca da biblioteca Recharts
 */
const convertDataToPieChart = (data) => {
  return Object.keys(data).map((key) => ({ name: key, value: data[key] }));
};

export default convertDataToPieChart;
