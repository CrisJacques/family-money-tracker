import axios from "axios";
import { API_URL_AUTH } from "../API_URLs";

/**
 * Envia a requisição de login e retorna o resultado
 * @param {String} email - Email do usuário
 * @param {String} password - Senha do usuário
 * @returns {Object} JSON com os dados do usuário logado
 */
const login = (email, password) => {
  return axios
    .post(API_URL_AUTH + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

/**
 * Executa o logout, removendo o usuário da localStorage
 */
const logout = () => {
  localStorage.removeItem("user");
};

/**
 * Exporta os services de login e logout
 */
const auth_services = {
  login,
  logout,
};

export default auth_services;
