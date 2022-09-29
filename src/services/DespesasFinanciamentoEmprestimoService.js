import axios from "axios";
import requestUrl from "../helpers/requestURL";
import convertMoneyToNumber from "../helpers/convertMoneyToNumber";

import DespesasDebitoDinheiroService from "../services/DespesasDebitoDinheiroService";
import DespesasCreditoService from "../services/DespesasCreditoService";

/**
 * Classe que executa ações relacionadas a despesas cuja forma de pagamento é financiamento ou empréstimo através do envio de requisições à API
 */
export default class DespesasFinanciamentoEmprestimoService {
  /**
   * Insere uma despesa cuja forma de pagamento é financiamento ou empréstimo
   * @param {String} userToken - Token do usuário logado
   * @param {number} value - Valor da despesa
   * @param {String} description - Descrição da despesa
   * @param {number} idBank - Id do banco selecionado
   * @param {number} numberInstallments - Número de parcelas
   * @param {number} idCategory - Id da categoria de despesa selecionada
   * @param {String} registerDate - Data da despesa
   * @param {number} paymentType - Id da forma de pagamento selecionada
   * @param {number} idCurrentUser - Id do usuário logado
   * @returns {Object} JSON com informações sobre resultado da requisição, incluindo o status code
   */
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
        banco: `${idBank}`,
      },
      {
        headers: {
          Authorization: `${userToken}`,
        },
      }
    );
  }
  /**
   * Retorna uma despesa cuja forma de pagamento é financiamento ou empréstimo
   * @param {String} userToken - Token do usuário logado
   * @param {number} id - Id da despesa
   * @returns {Object} JSON com informações sobre resultado da requisição, incluindo o status code
   */
  static async getDespesaFinanciamentoEmprestimo(userToken, id) {
    return axios.get(requestUrl(`despesas-financiamento-emprestimo/${id}`), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
  /**
   * Deleta uma despesa cuja forma de pagamento é financiamento ou empréstimo
   * @param {String} userToken - Token do usuário logado
   * @param {number} id - Id da despesa
   * @returns {Object} JSON com informações sobre resultado da requisição, incluindo o status code
   */
  static async deleteDespesaFinanciamentoEmprestimo(userToken, id) {
    return axios.delete(requestUrl(`despesas-financiamento-emprestimo/${id}`), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
  /**
   * Edita uma despesa cuja nova forma de pagamento é Financiamento ou Empréstimo.
   * Verifica a forma de pagamento original da despesa para decidir se será feito um PUT (se forma de pagamento continuar sendo Financiamento ou Empréstimo) ou se faz um DELETE seguido de um POST (ou seja, deleta a despesa original e cria uma nova com a nova forma de pagamento)
   * @param {number} id - Id da despesa
   * @param {String} userToken - Token do usuário logado
   * @param {number} value - Valor da despesa
   * @param {String} description - Descrição da despesa
   * @param {number} idBank - Id do banco selecionado
   * @param {number} numberInstallments - Número de parcelas
   * @param {number} idCategory - Id da categoria de despesa selecionada
   * @param {String} registerDate - Data da despesa
   * @param {number} paymentTypeNovo - Id da nova forma de pagamento da despesa
   * @param {number} paymentTypeOriginal - Id da forma de pagamento original da despesa
   * @param {number} idCurrentUser - Id do usuário logado
   * @returns {Object} JSON com informações sobre resultado da requisição, incluindo o status code
   */
  static async updateDespesaFinanciamentoEmprestimo(
    id,
    userToken,
    value,
    description,
    idBank,
    numberInstallments,
    idCategory,
    registerDate,
    paymentTypeNovo,
    paymentTypeOriginal,
    idCurrentUser
  ) {
    if (
      paymentTypeOriginal === "FINANCIAMENTO" ||
      paymentTypeOriginal === "EMPRESTIMO"
    ) {
      // Se a forma de pagamento original também for Financiamento ou Empréstimo, logo só é necessário fazer um PUT
      return axios.put(
        requestUrl(`despesas-financiamento-emprestimo/${id}`),
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
          banco: `${idBank}`,
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
      // Se a forma de pagamento original for Débito ou Dinheiro, logo será necessário deletar a despesa original e criar uma nova despesa, agora com a forma de pagamento Financiamento ou Empréstimo
      // Excluindo a despesa original cuja forma de pagamento é débito ou dinheiro
      DespesasDebitoDinheiroService.deleteDespesaDebitoDinheiro(userToken, id);

      // Inserindo a nova despesa com forma de pagamento Financiamento ou Empréstimo
      return this.insertDespesaFinanciamentoEmprestimo(
        userToken,
        value,
        description,
        idBank,
        numberInstallments,
        idCategory,
        registerDate,
        paymentTypeNovo,
        idCurrentUser
      );
    } else {
      // Se a forma de pagamento original for Cartão de Crédito, logo será necessário deletar a despesa original e criar uma nova despesa, agora com a forma de pagamento Financiamento ou Empréstimo
      // Excluindo a despesa original cuja forma de pagamento é Cartão de Crédito
      DespesasCreditoService.deleteDespesaCredito(userToken, id);

      // Inserindo a nova despesa com forma de pagamento Financiamento ou Empréstimo
      return this.insertDespesaFinanciamentoEmprestimo(
        userToken,
        value,
        description,
        idBank,
        numberInstallments,
        idCategory,
        registerDate,
        paymentTypeNovo,
        idCurrentUser
      );
    }
  }
}
