import axios from "axios";
import requestUrl from "../helpers/requestURL";
import convertMoneyToNumber from "../helpers/convertMoneyToNumber";

import DespesasCreditoService from "../services/DespesasCreditoService";
import DespesasFinanciamentoEmprestimoService from "../services/DespesasFinanciamentoEmprestimoService";

/**
 * Classe que executa ações relacionadas a despesas cuja forma de pagamento é débito ou dinheiro através do envio de requisições à API
 */
export default class DespesasDebitoDinheiroService {
  /**
   * Insere uma despesa cuja forma de pagamento é débito ou dinheiro
   * @param {String} userToken - Token do usuário logado
   * @param {number} value - Valor da despesa
   * @param {String} description - Descrição da despesa
   * @param {number} idAccount - Id da conta selecionada
   * @param {number} idCategory - Id da categoria de despesa selecionada
   * @param {String} registerDate - Data da despesa
   * @param {number} paymentType - Id da forma de pagamento selecionada
   * @param {number} idCurrentUser - Id do usuário logado
   * @returns {Object} JSON com informações sobre resultado da requisição, incluindo o status code
   */
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
  /**
   * Edita uma despesa cuja nova forma de pagamento é débito ou dinheiro.
   * Verifica a forma de pagamento original da despesa para decidir se será feito um PUT (se forma de pagamento continuar sendo Débito ou Dinheiro) ou se faz um DELETE seguido de um POST (ou seja, deleta a despesa original e cria uma nova com a nova forma de pagamento)
   * @param {number} id - Id da despesa
   * @param {String} userToken - Token do usuário logado
   * @param {number} value - Valor da despesa
   * @param {String} description - Descrição da despesa
   * @param {number} idAccount - Id da conta selecionada
   * @param {number} idCategory - Id da categoria de despesa selecionada
   * @param {String} registerDate - Data da despesa
   * @param {number} paymentTypeNovo - Id da nova forma de pagamento da despesa
   * @param {number} paymentTypeOriginal - Id da forma de pagamento original da despesa
   * @param {number} idCurrentUser - Id do usuário logado
   * @returns {Object} JSON com informações sobre resultado da requisição, incluindo o status code
   */
  static async updateDespesaDebitoDinheiro(
    id,
    userToken,
    value,
    description,
    idAccount,
    idCategory,
    registerDate,
    paymentTypeNovo,
    paymentTypeOriginal,
    idCurrentUser
  ) {
    if (
      paymentTypeOriginal === "DEBITO" ||
      paymentTypeOriginal === "DINHEIRO"
    ) {
      console.log("BORA FAZER UM PUT");
      // Se a forma de pagamento original também for Débito ou Dinheiro, logo só é necessário fazer um PUT
      return axios.put(
        requestUrl(`despesas-debito-dinheiro/${id}`),
        {
          valor: `${convertMoneyToNumber(value)}`,
          descricao: `${description}`,
          data: `${registerDate}`,
          recorrente: false,
          diaLancamentoRecorrente: null,
          formaDePagamento: `${paymentTypeNovo}`,
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
    } else if (paymentTypeOriginal === "CARTAO_DE_CREDITO") {
      // Se a forma de pagamento original for Cartão de Crédito, logo será necessário deletar a despesa original e criar uma nova despesa, agora com a forma de pagamento Débito ou Dinheiro
      console.log(
        "BORA DELETAR A DESPESA DE CARTÃO DE CRÉDITO E CRIAR UMA DE DÉBITO OU DINHEIRO"
      );

      // Excluindo a despesa original cuja forma de pagamento é cartão de crédito
      DespesasCreditoService.deleteDespesaCredito(userToken, id);

      // Inserindo a nova despesa com forma de pagamento débito ou dinheiro
      return this.insertDespesaDebitoDinheiro(
        userToken,
        value,
        description,
        idAccount,
        idCategory,
        registerDate,
        paymentTypeNovo,
        idCurrentUser
      );
    } else {
      // Se a forma de pagamento original for Financiamento ou Empréstimo, logo será necessário deletar a despesa original e criar uma nova despesa, agora com a forma de pagamento Débito ou Dinheiro
      console.log(
        "BORA DELETAR A DESPESA DE FINANCIAMENTO OU EMPRÉSTIMO E CRIAR UMA DE DÉBITO OU DINHEIRO"
      );

      // Excluindo a despesa original cuja forma de pagamento é cartão de crédito
      DespesasFinanciamentoEmprestimoService.deleteDespesaFinanciamentoEmprestimo(
        userToken,
        id
      );

      // Inserindo a nova despesa com forma de pagamento débito ou dinheiro
      return this.insertDespesaDebitoDinheiro(
        userToken,
        value,
        description,
        idAccount,
        idCategory,
        registerDate,
        paymentTypeNovo,
        idCurrentUser
      );
    }
  }
  /**
   * Retorna uma despesa cuja forma de pagamento é débito ou dinheiro
   * @param {String} userToken - Token do usuário logado
   * @param {number} id - Id da despesa
   * @returns {Object} JSON com informações sobre resultado da requisição, incluindo o status code
   */
  static async getDespesaDebitoDinheiro(userToken, id) {
    return axios.get(requestUrl(`despesas-debito-dinheiro/${id}`), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
}
