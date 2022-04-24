import axios from 'axios';
import { API_URL_BASE } from '../API_URLs';
import convertMoneyToNumber from '../helpers/convertMoneyToNumber';

const requestUrl = path => `${API_URL_BASE}${path}`;

export default class DespesasFinanciamentoEmprestimoService {
  static async insertDespesaFinanciamentoEmprestimo(
    userToken,
    value,
    description,
    idBank,
    numberInstallments,
    idCategory,
    registerDate,
    paymentType,
    idCurrentUser
  ) {
    return axios.post(
      requestUrl("despesas-financiamento-emprestimo"),
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
        banco: `${idBank}`
      },
      {
        headers: {
          Authorization: `${userToken}`,
        },
      }
    );
  }
}