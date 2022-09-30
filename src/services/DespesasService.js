import axios from "axios";
import requestUrl from "../helpers/requestURL";

/**
 * Classe que executa consultas gerais relacionadas a despesas através do envio de requisições à API
 */
export default class DespesasService {
  /**
   * Lista as despesas recentes
   * @param {String} userToken - Token do usuário logado
   * @returns {Object} JSON com lista das despesas recentes, contendo apenas as informações essenciais de cada uma delas (DTOs)
   */
  static getDespesasRecentes(userToken) {
    return axios.get(requestUrl("despesas?recentes=true"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
  /**
   * Lista os valores totais de despesas por categoria para o mês atual
   * @param {String} userToken - Token do usuário logado
   * @returns {Object} JSON com as categorias de despesas e os valores totais por categoria
   */
  static getTotaisPorCategoria(userToken) {
    return axios.get(requestUrl("despesas/total-por-categoria"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
  /**
   * Lista os valores totais de despesas por categoria para o período selecionado
   * @param {String} userToken - Token do usuário logado
   * @param {String} startDate - Data inicial do período a ser buscado (formato dd/mm/aaaa)
   * @param {String} endDate - Data final do período a ser buscado (formato dd/mm/aaaa)
   * @returns {Object} JSON com as categorias de despesas e os valores totais por categoria
   */
  static getTotaisPorCategoriaPeriodoSelecionado(
    userToken,
    startDate,
    endDate
  ) {
    return axios.get(
      requestUrl(
        `despesas/total-por-categoria?start=${startDate}&end=${endDate}`
      ),
      {
        headers: {
          Authorization: `${userToken}`,
        },
      }
    );
  }
  /**
   * Lista as despesas pertencentes ao período informado por parâmetro
   * @param {String} userToken - Token do usuário logado
   * @param {String} startDate - Data inicial do período a ser buscado (formato dd/mm/aaaa)
   * @param {String} endDate - Data final do período a ser buscado (formato dd/mm/aaaa)
   * @returns {Object} JSON com lista das despesas do período, contendo apenas as informações essenciais de cada uma delas (DTOs)
   */
  static getDespesasPorPeriodo(userToken, startDate, endDate) {
    return axios.get(
      requestUrl(`despesas?start=${startDate}&end=${endDate}&por_periodo=true`),
      {
        headers: {
          Authorization: `${userToken}`,
        },
      }
    );
  }
  /**
   * Remove uma despesa cujo id e forma de pagamento é passada por parâmetro
   * @param {String} userToken - Token do usuário logado
   * @param {String} id - Identificador da despesa
   * @param {String} formaDePagamento - Nome da forma de pagamento da despesa
   */
  static removeDespesa(userToken, id, formaDePagamento) {
    return axios.delete(
      requestUrl(`despesas/${id}?forma_pagamento=${formaDePagamento}`),
      {
        headers: {
          Authorization: `${userToken}`,
        },
      }
    );
  }
}
