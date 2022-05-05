import axios from "axios";
import { API_URL_BASE } from "../API_URLs";

const requestUrl = (path) => `${API_URL_BASE}${path}`;

/* Services que tratam das requisições referentes às despesas */
export default class DespesasService {
  /* Lista as despesas recentes */
  static getDespesasRecentes(userToken) {
    return axios.get(requestUrl("despesas?recentes=true"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
    /* Lista os valores totais por categoria para o mês atual */
    static getTotaisPorCategoria(userToken) {
      return axios.get(requestUrl("despesas/total-por-categoria"), {
        headers: {
          Authorization: `${userToken}`,
        },
      });
    }
}