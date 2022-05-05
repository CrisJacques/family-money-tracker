import axios from "axios";
import { API_URL_BASE } from "../API_URLs";

const requestUrl = (path) => `${API_URL_BASE}${path}`;

/* Services que tratam das requisições referentes às transacoes */
export default class TransacoesService {
  /* Lista os valores totais de despesas e receitas para o mês atual */
  static getTotaisMesAtual(userToken) {
    return axios.get(requestUrl("transacoes/total-geral"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
  /* Lista os valores totais de despesas e receitas para o mês atual, junto com o saldo resultante */
  static getTotaisMesAtualComSaldo(userToken) {
    return axios.get(requestUrl("transacoes/total-geral?saldo=true"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
}