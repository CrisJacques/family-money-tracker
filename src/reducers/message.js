import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/type";

const initialState = {};

/**
 * Reducer que lida com atualização de mensagens
 * @param {*} state - State atual da aplicação
 * @param {*} action - Action que deve ser executada
 * @returns Novo state de acordo com a action recebida ou o state recebido caso a action não esteja dentre as definidas
 */
export default function message(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload };
    case CLEAR_MESSAGE:
      return { message: "" };
    default:
      return state;
  }
}
