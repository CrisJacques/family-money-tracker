import axios from "axios";
import { API_URL_BASE } from "../API_URLs";

const requestUrl = (path) => `${API_URL_BASE}${path}`;

/* Services que tratam das requisições referentes às formas de pagamento */
export default class FormasDePagamentoService {
  /* Lista todas as formas de pagamento cadastradas */
  static getFormasDePagamento(userToken) {
    return axios.get(requestUrl("formas-de-pagamento"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
}
