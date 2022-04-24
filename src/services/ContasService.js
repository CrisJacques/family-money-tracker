import axios from "axios";
import { API_URL_BASE } from "../API_URLs";

const requestUrl = (path) => `${API_URL_BASE}${path}`;

/* Services que tratam das requisições referentes às contas */
export default class ContasService {
  /* Lista todas as contas cadastradas */
  static getContas(userToken) {
    return axios.get(requestUrl("contas"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
}
