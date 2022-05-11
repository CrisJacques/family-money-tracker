import axios from "axios";
import { API_URL_BASE } from "../API_URLs";
import convertMoneyToNumber from "../helpers/convertMoneyToNumber";

/**
 * Faz a união da URL base da API com o caminho passado por parâmetro
 * @param {String} path - Caminho do endpoint
 * @returns {String} Caminho completo da requisição
 */
const requestUrl = (path) => `${API_URL_BASE}${path}`;

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
}
