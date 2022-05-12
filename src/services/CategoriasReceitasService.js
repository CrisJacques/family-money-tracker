import axios from "axios";
import requestUrl from "../helpers/requestURL";

/**
 * Classe que executa ações relacionadas a categorias de receitas através do envio de requisições à API
 */
export default class CategoriasReceitasService {
  /**
   * Lista todas as categorias de receitas cadastradas
   * @param {String} userToken - Token do usuário logado
   * @returns {Object} JSON com lista das categorias de receitas, contendo todas as informações vinculadas a elas
   */
  static getCategoriasReceitas(userToken) {
    return axios.get(requestUrl("categorias-receitas"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
}
