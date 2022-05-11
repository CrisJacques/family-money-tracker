import axios from "axios";
import { API_URL_BASE } from "../API_URLs";

/**
 * Faz a união da URL base da API com o caminho passado por parâmetro
 * @param {String} path - Caminho do endpoint
 * @returns {String} Caminho completo da requisição
 */
const requestUrl = (path) => `${API_URL_BASE}${path}`;

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
