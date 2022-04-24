import axios from "axios";
import { API_URL_BASE } from "../API_URLs";
import convertMoneyToNumber from "../helpers/convertMoneyToNumber";

const requestUrl = (path) => `${API_URL_BASE}${path}`;

/* Services que tratam das requisições referentes às despesas cuja forma de pagamento é débito ou dinheiro */
export default class DespesasDebitoDinheiroService {
  /* Insere uma nova despesa cuja forma de pagamento é débito ou dinheiro */
  static async insertDespesaDebitoDinheiro(
    userToken,
    value,
    description,
    idAccount,
    idCategory,
    registerDate,
    paymentType,
    idCurrentUser
  ) {
    return axios.post(
      requestUrl("despesas-debito-dinheiro"),
      {
        valor: `${convertMoneyToNumber(value)}`,
        descricao: `${description}`,
        data: `${registerDate}`,
        recorrente: false,
        diaLancamentoRecorrente: null,
        formaDePagamento: `${paymentType}`,
        categoriaDespesa: {
          id: `${idCategory}`,
        },
        conta: {
          id: `${idAccount}`,
        },
        user: {
          id: `${idCurrentUser}`,
        },
      },
      {
        headers: {
          Authorization: `${userToken}`,
        },
      }
    );
  }
}
