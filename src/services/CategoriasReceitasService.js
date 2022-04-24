import axios from "axios";
import { API_URL_BASE } from "../API_URLs";

const requestUrl = (path) => `${API_URL_BASE}${path}`;

/* Services que tratam das requisições referentes às categorias de receitas */
export default class CategoriasReceitasService {
  /* Lista todas as categorias de receitas cadastradas */
  static getCategoriasReceitas(userToken) {
    return axios.get(requestUrl("categorias-receitas"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
}
