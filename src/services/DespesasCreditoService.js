import axios from "axios";
import requestUrl from "../helpers/requestURL";
import convertMoneyToNumber from "../helpers/convertMoneyToNumber";

import DespesasDebitoDinheiroService from "../services/DespesasDebitoDinheiroService";
import DespesasFinanciamentoEmprestimoService from "../services/DespesasFinanciamentoEmprestimoService";

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
  /**
   * Retorna uma despesa cuja forma de pagamento é cartão de crédito
   * @param {String} userToken - Token do usuário logado
   * @param {number} id - Id da despesa
   * @returns {Object} JSON com informações sobre resultado da requisição, incluindo o status code
   */
  static async getDespesaCredito(userToken, id) {
    return axios.get(requestUrl(`despesas-credito/${id}`), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
  /**
   * Deleta uma despesa cuja forma de pagamento é cartão de crédito
   * @param {String} userToken - Token do usuário logado
   * @param {number} id - Id da despesa
   * @returns {Object} JSON com informações sobre resultado da requisição, incluindo o status code
   */
  static async deleteDespesaCredito(userToken, id) {
    return axios.delete(requestUrl(`despesas-credito/${id}`), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
  /**
   * Edita uma despesa cuja nova forma de pagamento é Cartão de Crédito.
   * Verifica a forma de pagamento original da despesa para decidir se será feito um PUT (se forma de pagamento continuar sendo Cartão de Crédito) ou se faz um DELETE seguido de um POST (ou seja, deleta a despesa original e cria uma nova com a nova forma de pagamento)
   * @param {number} id - Id da despesa
   * @param {String} userToken - Token do usuário logado
   * @param {number} value - Valor da despesa
   * @param {String} description - Descrição da despesa
   * @param {number} idCreditCard - Id do cartão de crédito selecionado
   * @param {number} numberInstallments - Número de parcelas
   * @param {number} idCategory - Id da categoria de despesa selecionada
   * @param {String} registerDate - Data da despesa
   * @param {number} paymentTypeNovo - Id da nova forma de pagamento da despesa
   * @param {number} paymentTypeOriginal - Id da forma de pagamento original da despesa
   * @param {number} idCurrentUser - Id do usuário logado
   * @returns {Object} JSON com informações sobre resultado da requisição, incluindo o status code
   */
  static async updateDespesaCredito(
    id,
    userToken,
    value,
    description,
    idCreditCard,
    numberInstallments,
    idCategory,
    registerDate,
    paymentTypeNovo,
    paymentTypeOriginal,
    idCurrentUser
  ) {
    if (paymentTypeOriginal === "CARTAO_DE_CREDITO") {
      // Se a forma de pagamento original também for Cartão de Crédito, logo só é necessário fazer um PUT
      return axios.put(
        requestUrl(`despesas-credito/${id}`),
        {
          valor: `${convertMoneyToNumber(value)}`,
          descricao: `${description}`,
          data: `${registerDate}`,
          recorrente: false,
          diaLancamentoRecorrente: null,
          formaDePagamento: `${paymentTypeNovo}`,
          numeroParcelas: `${numberInstallments}`,
          categoriaDespesa: {
            id: `${idCategory}`,
          },
          cartaoDeCredito: {
            id: `${idCreditCard}`,
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
    } else if (
      paymentTypeOriginal === "DINHEIRO" ||
      paymentTypeOriginal === "DEBITO"
    ) {
      // Se a forma de pagamento original for Débito ou Dinheiro, logo será necessário deletar a despesa original e criar uma nova despesa, agora com a forma de pagamento Cartão de Crédito
      // Excluindo a despesa original cuja forma de pagamento é débito ou dinheiro
      DespesasDebitoDinheiroService.deleteDespesaDebitoDinheiro(userToken, id);

      // Inserindo a nova despesa com forma de pagamento cartão de crédito
      return this.insertDespesaCredito(
        userToken,
        value,
        description,
        idCreditCard,
        numberInstallments,
        idCategory,
        registerDate,
        paymentTypeNovo,
        idCurrentUser
      );
    } else {
      // Se a forma de pagamento original for Financiamento ou Empréstimo, logo será necessário deletar a despesa original e criar uma nova despesa, agora com a forma de pagamento cartão de crédito
      // Excluindo a despesa original cuja forma de pagamento é financiamento ou empréstimo
      DespesasFinanciamentoEmprestimoService.deleteDespesaFinanciamentoEmprestimo(
        userToken,
        id
      );

      // Inserindo a nova despesa com forma de pagamento cartão de crédito
      return this.insertDespesaCredito(
        userToken,
        value,
        description,
        idCreditCard,
        numberInstallments,
        idCategory,
        registerDate,
        paymentTypeNovo,
        idCurrentUser
      );
    }
  }
}
