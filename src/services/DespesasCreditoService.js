import axios from "axios";
import requestUrl from "../helpers/requestURL";
import convertMoneyToNumber from "../helpers/convertMoneyToNumber";

/**
 * Classe que executa ações relacionadas a despesas cuja forma de pagamento é cartão de crédito através do envio de requisições à API
 */
export default class DespesasCreditoService {
  /**
   * Insere uma despesa cuja forma de pagamento é cartão de crédito
   * @param {String} userToken - Token do usuário logado
   * @param {number} value - Valor da despesa
   * @param {String} description - Descrição da despesa
   * @param {number} idCreditCard - Id do cartão de crédito selecionado
   * @param {number} numberInstallments - Número de parcelas
   * @param {number} idCategory - Id da categoria de despesa selecionada
   * @param {String} registerDate - Data da despesa
   * @param {number} paymentType - Id da forma de pagamento selecionada
   * @param {number} idCurrentUser - Id do usuário logado
   * @returns {Object} JSON com informações sobre resultado da requisição, incluindo o status code
   */
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
          id: `${idCreditCard}`,
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
