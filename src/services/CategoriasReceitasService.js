import axios from 'axios';
import { API_URL_BASE } from '../API_URLs';

const requestUrl = path => `${API_URL_BASE}${path}`;

export default class CategoriasReceitasService {
  static getCategoriasReceitas(userToken) {
    return axios.get(requestUrl("categorias-receitas"), {
      headers: {
        Authorization: `${userToken}`,
      },
    });
  }
}