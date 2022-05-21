import { createStore } from "redux";

import rootReducer from "./reducers";

/**
 * Criando a store do Redux, passando todos os reducers criados
 */
const store = createStore(rootReducer);

export default store;
