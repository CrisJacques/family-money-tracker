import axios from 'axios';
import { API_URL_BASE } from '../API_URLs';

const requestUrl = path => `${API_URL_BASE}${path}`;

export default class ReceitasService {
  static insertReceita(userToken, value, description, idAccount, idCategory, registerDate, idCurrentUser) {
    return axios
      .post(
        requestUrl("receitas"),
        {
          valor: `${value}`,
          descricao: `${description}`,
          data: `${registerDate}`,
          recorrente: false,
          diaLancamentoRecorrente: null,
          categoriaReceita: {
            id: `${idCategory}`,
          },
          conta: {
            id: `${idAccount}`,
          },
          user: {
            id: `${idCurrentUser}`,
          },
        },
        {
          headers: {
            Authorization: `${userToken}`,
          },
        }
      )
  }
}