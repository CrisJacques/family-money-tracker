import { API_URL_BASE } from "../API_URLs";

/**
 * Faz a união da URL base da API com o caminho passado por parâmetro
 * @param {String} path - Caminho do endpoint
 * @returns {String} Caminho completo da requisição
 */
 const requestUrl = (path) => `${API_URL_BASE}${path}`;

 export default requestUrl;