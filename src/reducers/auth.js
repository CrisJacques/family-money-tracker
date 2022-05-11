import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../actions/type";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

/**
 * Reducer que lida com atualização de estados no login e logout
 * @param {*} state - State atual da aplicação
 * @param {*} action - Action que deve ser executada
 * @returns Novo state de acordo com a action recebida ou o state recebido caso a action não esteja dentre as definidas
 */
export default function auth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
