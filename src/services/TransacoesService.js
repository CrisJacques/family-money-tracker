import axios from "axios";
import requestUrl from "../helpers/requestURL";

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
  /**
   * Lista os valores totais de despesas e receitas para o período selecionado, junto com o saldo resultante
   * @param {String} userToken - Token do usuário logado
   * @param {String} dataInicial - Data inicial do período selecionado
   * @param {String} dataFinal - Data final do período selecionado
   * @returns {Object} JSON contendo o valor total de despesas, o total de receitas e o saldo resultante para o período selecionado
   */
  static getTotaisPeriodoSelecionadoComSaldo(
    userToken,
    dataInicial,
    dataFinal
  ) {
    return axios.get(
      requestUrl(
        `transacoes/total-geral?start=${dataInicial}&end=${dataFinal}&saldo=true`
      ),
      {
        headers: {
          Authorization: `${userToken}`,
        },
      }
    );
  }
  /**
   * Lista os valores totais de despesas e receitas para o período selecionado
   * @param {String} userToken - Token do usuário logado
   * @param {String} dataInicial - Data inicial do período selecionado
   * @param {String} dataFinal - Data final do período selecionado
   * @returns {Object} JSON contendo o valor total de despesas e o total de receitas
   */
  static getTotaisPeriodoSelecionado(userToken, dataInicial, dataFinal) {
    return axios.get(
      requestUrl(
        `transacoes/total-geral?start=${dataInicial}&end=${dataFinal}`
      ),
      {
        headers: {
          Authorization: `${userToken}`,
        },
      }
    );
  }
}
