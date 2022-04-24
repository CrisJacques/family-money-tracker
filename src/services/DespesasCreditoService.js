import axios from 'axios';
import { API_URL_BASE } from '../API_URLs';
import convertMoneyToNumber from '../helpers/convertMoneyToNumber';

const requestUrl = path => `${API_URL_BASE}${path}`;

export default class DespesasCreditoService {
  static async insertDespesaCredito(
    userToken,
    value,
    description,
    idCreditCard,
    numberInstallments,
    idCategory,
    registerDate,
    paymentType,
    idCurrentUser
  ) {
    return axios.post(
      requestUrl("despesas-credito"),
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
        user: {
          id: `${idCurrentUser}`,
        },
        numeroParcelas: `${numberInstallments}`,
        cartaoDeCredito: {
            id: `${idCreditCard}`
        }
      },
      {
        headers: {
          Authorization: `${userToken}`,
        },
      }
    );
  }
}