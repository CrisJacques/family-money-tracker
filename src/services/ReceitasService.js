import axios from "axios";
import requestUrl from "../helpers/requestURL";
import convertMoneyToNumber from "../helpers/convertMoneyToNumber";

/**
 * Classe que executa ações relacionadas a receitas através do envio de requisições à API
 */
export default class ReceitasService {
  /**
   * Insere uma receita
   * @param {String} userToken - Token do usuário logado
   * @param {number} value - Valor da receita
   * @param {String} description - Descrição da receita
   * @param {number} idAccount - Id da conta selecionada
   * @param {number} idCategory - Id da categoria de receita selecionada
   * @param {String} registerDate - Data da receita
   * @param {number} idCurrentUser - Id do usuário logado
   * @returns {Object} JSON com informações sobre resultado da requisição, incluindo o status code
   */
  static async insertReceita(
    userToken,
    value,
    description,
    idAccount,
    idCategory,
    registerDate,
    idCurrentUser
  ) {
    return axios.post(
      requestUrl("receitas"),
      {
        valor: `${convertMoneyToNumber(value)}`,
        descricao: `${description}`,
        data: `${registerDate}`,
        recorrente: false,
        diaLancamentoRecorrente: null,
        categoriaReceita: {
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
   * Lista as receitas recentes
   * @param {String} userToken - Token do usuário logado
   * @returns {Object} JSON com lista das receitas recentes, contendo apenas as informações essenciais de cada uma delas (DTOs)
   */
  static getReceitasRecentes(userToken) {
    return axios.get(requestUrl("receitas?recentes=true"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
  /**
   * Lista os valores totais de receitas por categoria para o mês atual
   * @param {String} userToken - Token do usuário logado
   * @returns {Object} JSON com as categorias de receitas e os valores totais por categoria
   */
  static getTotaisPorCategoria(userToken) {
    return axios.get(requestUrl("receitas/total-por-categoria"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
   /**
   * Lista as receitas pertencentes ao período informado por parâmetro
   * @param {String} userToken - Token do usuário logado
   * @param {String} startDate - Data inicial do período a ser buscado (formato dd/mm/aaaa)
   * @param {String} endDate - Data final do período a ser buscado (formato dd/mm/aaaa)
   * @returns {Object} JSON com lista das receitas do período, contendo apenas as informações essenciais de cada uma delas (DTOs)
   */
    static getReceitasPorPeriodo(userToken, startDate, endDate) {
      return axios.get(
        requestUrl(
          `receitas?start=${startDate}&end=${endDate}&por_periodo=true`
        ),
        {
          headers: {
            Authorization: `${userToken}`,
          },
        }
      );
    }
}
