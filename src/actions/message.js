import { SET_MESSAGE, CLEAR_MESSAGE } from "./type";

/**
 * Cria a Action responsável por atualizar a mensagem de erro armazenada na store da aplicação.
 * @param {String} message - Mensagem que deve ser armazenada na store
 * @returns Action do tipo SET_MESSAGE
 */
export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});

/**
 * Cria a Action responsável por limpar a mensagem de erro da store da aplicação
 * @returns Action do tipo CLEAR_MESSAGE
 */
export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});
