import axios from 'axios';
import { API_URL_BASE } from '../API_URLs';

const requestUrl = path => `${API_URL_BASE}${path}`;

export default class CartoesDeCreditoService {
  static getCartoesDeCredito(userToken) {
    return axios.get(requestUrl("cartoes-de-credito"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
}