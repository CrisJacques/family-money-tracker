import axios from 'axios';
import { API_URL_BASE } from '../API_URLs';

const requestUrl = path => `${API_URL_BASE}${path}`;

export default class ContasService {
  static getContas(userToken) {
    return axios.get(requestUrl("contas"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
}