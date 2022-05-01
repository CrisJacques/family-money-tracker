import axios from "axios";
import { API_URL_BASE } from "../API_URLs";
import convertMoneyToNumber from "../helpers/convertMoneyToNumber";

const requestUrl = (path) => `${API_URL_BASE}${path}`;

/* Services que tratam das requisições referentes às receitas */
export default class ReceitasService {
  /* Insere uma nova receita */
  static async insertReceita(
    userToken,
    value,
    description,
    idAccount,
    idCategory,
    registerDate,
    idCurrentUser
  ) {
    return axios.post(
      requestUrl("receitas"),
      {
        valor: `${convertMoneyToNumber(value)}`,
        descricao: `${description}`,
        data: `${registerDate}`,
        recorrente: false,
        diaLancamentoRecorrente: null,
        categoriaReceita: {
          id: `${idCategory}`,
        },
        conta: {
          id: `${idAccount}`,
        },
        user: {
          id: `${idCurrentUser}`,
        },
      },
      {
        headers: {
          Authorization: `${userToken}`,
        },
      }
    );
  }
  /* Lista as receitas recentes */
  static getReceitasRecentes(userToken) {
    return axios.get(requestUrl("receitas?recentes=true"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
  /* Lista os valores totais por categoria para o mês atual */
  static getTotaisPorCategoria(userToken) {
    return axios.get(requestUrl("receitas/total-por-categoria"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
}
