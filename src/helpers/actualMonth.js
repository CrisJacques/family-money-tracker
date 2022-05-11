/**
 * Obtém o mês e ano atual
 * @returns {String} Mês e ano atual para exibição na tela inicial, no formato MMM/YYYY
 */
const actualMonth = () => {
  var today = new Date();
  var month = today.getMonth() + 1; // Precisa somar 1 porque é retornado valor 0 para Janeiro e assim por diante
  var monthText = "";
  var year = today.getFullYear();

  switch (month) {
    case 1:
      monthText = "Jan";
      break;
    case 2:
      monthText = "Fev";
      break;
    case 3:
      monthText = "Mar";
      break;
    case 4:
      monthText = "Abr";
      break;
    case 5:
      monthText = "Mai";
      break;
    case 6:
      monthText = "Jun";
      break;
    case 7:
      monthText = "Jul";
      break;
    case 8:
      monthText = "Ago";
      break;
    case 9:
      monthText = "Set";
      break;
    case 10:
      monthText = "Out";
      break;
    case 11:
      monthText = "Nov";
      break;
    case 12:
      monthText = "Dez";
      break;
    default:
      monthText = "";
  }

  return `${monthText}/${year}`;
};

export default actualMonth;
