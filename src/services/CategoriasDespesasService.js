import axios from 'axios';
import { API_URL_BASE } from '../API_URLs';

const requestUrl = path => `${API_URL_BASE}${path}`;

export default class CategoriasDespesasService {
  static getCategoriasDespesas(userToken) {
    return axios.get(requestUrl("categorias-despesas"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
}
