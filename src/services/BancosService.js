import axios from "axios";
import requestUrl from "../helpers/requestURL";

/**
 * Classe que executa ações relacionadas a bancos através do envio de requisições à API
 */
export default class BancosService {
  /**
   * Lista todos os bancos cadastrados
   * @param {String} userToken - Token do usuário logado
   * @returns {Object} JSON com lista dos bancos cadastrados, contendo descrição e código
   */
  static getBancos(userToken) {
    return axios.get(requestUrl("bancos"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
}
