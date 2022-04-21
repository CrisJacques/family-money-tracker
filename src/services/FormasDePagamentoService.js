import axios from 'axios';
import { API_URL_BASE } from '../API_URLs';

const requestUrl = path => `${API_URL_BASE}${path}`;

export default class FormasDePagamentoService {
  static getFormasDePagamento(userToken) {
    return axios.get(requestUrl("formas-de-pagamento"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
}