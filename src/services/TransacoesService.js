import axios from "axios";
import { API_URL_BASE } from "../API_URLs";

/**
 * Faz a união da URL base da API com o caminho passado por parâmetro
 * @param {String} path - Caminho do endpoint
 * @returns {String} Caminho completo da requisição
 */
const requestUrl = (path) => `${API_URL_BASE}${path}`;

/**
 * Classe que executa consultas gerais relacionadas a transações (despesas e receitas) através do envio de requisições à API
 */
export default class TransacoesService {
  /**
   * Lista os valores totais de despesas e receitas para o mês atual
   * @param {String} userToken - Token do usuário logado
   * @returns {Object} JSON contendo o valor total de despesas e o total de receitas para o mês atual
   */
  static getTotaisMesAtual(userToken) {
    return axios.get(requestUrl("transacoes/total-geral"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
  /**
   * Lista os valores totais de despesas e receitas para o mês atual, junto com o saldo resultante
   * @param {String} userToken - Token do usuário logado
   * @returns {Object} JSON contendo o valor total de despesas, o total de receitas e o saldo resultante para o mês atual
   */
  static getTotaisMesAtualComSaldo(userToken) {
    return axios.get(requestUrl("transacoes/total-geral?saldo=true"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
}
