import axios from "axios";
import requestUrl from "../helpers/requestURL";

/**
 * Classe que executa ações relacionadas a contas através do envio de requisições à API
 */
export default class ContasService {
  /**
   * Lista todas as contas cadastradas
   * @param {String} userToken - Token do usuário logado
   * @returns {Object} JSON com lista das contas, contendo todas as informações vinculadas a elas
   */
  static getContas(userToken) {
    return axios.get(requestUrl("contas"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
}
