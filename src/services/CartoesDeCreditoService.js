import axios from "axios";
import { API_URL_BASE } from "../API_URLs";

const requestUrl = (path) => `${API_URL_BASE}${path}`;

/* Services que tratam das requisições referentes aos cartões de crédito */
export default class CartoesDeCreditoService {
  /* Lista todos os cartões de crédito cadastrados */
  static getCartoesDeCredito(userToken) {
    return axios.get(requestUrl("cartoes-de-credito"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
}
