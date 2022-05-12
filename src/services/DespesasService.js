import axios from "axios";
import requestUrl from "../helpers/requestURL";

/**
 * Classe que executa consultas gerais relacionadas a despesas através do envio de requisições à API
 */
export default class DespesasService {
  /**
   * Lista as despesas recentes
   * @param {String} userToken - Token do usuário logado
   * @returns {Object} JSON com lista das despesas recentes, contendo apenas as informações essenciais de cada uma delas (DTOs)
   */
  static getDespesasRecentes(userToken) {
    return axios.get(requestUrl("despesas?recentes=true"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
  /**
   * Lista os valores totais de despesas por categoria para o mês atual
   * @param {String} userToken - Token do usuário logado
   * @returns {Object} JSON com as categorias de despesas e os valores totais por categoria
   */
  static getTotaisPorCategoria(userToken) {
    return axios.get(requestUrl("despesas/total-por-categoria"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
}
