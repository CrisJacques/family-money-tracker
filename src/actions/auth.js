import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE } from "./type";
import AuthService from "../services/auth.service";

/**
 * Envia a requisição de login e trata o resultado
 * @param {String} email - Email do usuário
 * @param {String} password - Senha do usuário
 * @returns {Promise} Promise resolvida ou rejeitada, dependendo se login foi realizado com sucesso ou não
 */
export const login = (email, password) => (dispatch) => {
  return AuthService.login(email, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject(message);
    }
  );
};

/**
 * Faz o logout, disparando a Action correspondente.
 * @returns
 */
export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
};
