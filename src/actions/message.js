import { SET_MESSAGE, CLEAR_MESSAGE } from "./type";

/* Actions relacionadas à atualização de mensagens */

export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});
