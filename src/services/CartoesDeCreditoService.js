import axios from "axios";
import { API_URL_BASE } from "../API_URLs";

/**
 * Faz a união da URL base da API com o caminho passado por parâmetro
 * @param {String} path - Caminho do endpoint
 * @returns {String} Caminho completo da requisição
 */
const requestUrl = (path) => `${API_URL_BASE}${path}`;

/**
 * Classe que executa ações relacionadas a cartões de crédito através do envio de requisições à API
 */
export default class CartoesDeCreditoService {
  /**
   * Lista todos os cartões de crédito cadastrados
   * @param {String} userToken - Token do usuário logado
   * @returns {Object} JSON com lista dos cartões de crédito, contendo todas as informações vinculadas a eles
   */
  static getCartoesDeCredito(userToken) {
    return axios.get(requestUrl("cartoes-de-credito"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
}
