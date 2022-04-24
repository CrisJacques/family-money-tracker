import axios from "axios";
import { API_URL_BASE } from "../API_URLs";

const requestUrl = (path) => `${API_URL_BASE}${path}`;

/* Services que tratam das requisições referentes às categorias de despesas */
export default class CategoriasDespesasService {
  /* Lista todas as categorias de despesas cadastradas */
  static getCategoriasDespesas(userToken) {
    return axios.get(requestUrl("categorias-despesas"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
}
