import axios from 'axios';
import { API_URL_BASE } from '../API_URLs';

const requestUrl = path => `${API_URL_BASE}${path}`;

export default class BancosService {
  static getBancos(userToken) {
    return axios.get(requestUrl("bancos"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
}