import axios from "axios";
import requestUrl from "../helpers/requestURL";

/**
 * Classe que executa ações relacionadas a categorias de despesas através do envio de requisições à API
 */
export default class CategoriasDespesasService {
  /**
   * Lista todas as categorias de despesas cadastradas
   * @param {String} userToken - Token do usuário logado
   * @returns {Object} JSON com lista das categorias de despesas, contendo todas as informações vinculadas a elas
   */
  static getCategoriasDespesas(userToken) {
    return axios.get(requestUrl("categorias-despesas"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
}
