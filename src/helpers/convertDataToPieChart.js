/* Converte o formato em que as informações vem do backend para um formato que possa ser passado diretamente aos gráficos */
const convertDataToPieChart = (data) => {
  return Object.keys(data).map((key) => ({ name: key, value: data[key] }));
};

export default convertDataToPieChart;
