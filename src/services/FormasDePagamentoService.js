import axios from "axios";
import { API_URL_BASE } from "../API_URLs";

/**
 * Faz a união da URL base da API com o caminho passado por parâmetro
 * @param {String} path - Caminho do endpoint
 * @returns {String} Caminho completo da requisição
 */
const requestUrl = (path) => `${API_URL_BASE}${path}`;

/**
 * Classe que executa ações relacionadas a formas de pagamento através do envio de requisições à API
 */
export default class FormasDePagamentoService {
  /**
   * Lista todas as formas de pagamento cadastradas
   * @param {String} userToken - Token do usuário logado
   * @returns {Object} JSON com lista das formas de pagamento cadastradas, contendo descrição e código
   */
  static getFormasDePagamento(userToken) {
    return axios.get(requestUrl("formas-de-pagamento"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
}
