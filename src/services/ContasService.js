import axios from "axios";
import { API_URL_BASE } from "../API_URLs";

/**
 * Faz a união da URL base da API com o caminho passado por parâmetro
 * @param {String} path - Caminho do endpoint
 * @returns {String} Caminho completo da requisição
 */
const requestUrl = (path) => `${API_URL_BASE}${path}`;

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
