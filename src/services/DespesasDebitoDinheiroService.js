import axios from 'axios';
import { API_URL_BASE } from '../API_URLs';
import convertMoneyToNumber from '../helpers/convertMoneyToNumber';

const requestUrl = path => `${API_URL_BASE}${path}`;

export default class DespesasDebitoDinheiroService {
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