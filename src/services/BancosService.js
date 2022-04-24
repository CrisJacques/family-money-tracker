import axios from "axios";
import { API_URL_BASE } from "../API_URLs";

const requestUrl = (path) => `${API_URL_BASE}${path}`;

/* Services que tratam das requisições referentes aos Bancos */
export default class BancosService {
  /* Lista todos os bancos cadastrados */
  static getBancos(userToken) {
    return axios.get(requestUrl("bancos"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
}
