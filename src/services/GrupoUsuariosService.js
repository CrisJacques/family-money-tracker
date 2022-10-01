import axios from "axios";
import requestUrl from "../helpers/requestURL";

/**
 * Classe que executa ações relacionadas a grupos de usuários através do envio de requisições à API
 */
export default class GrupoUsuariosService {
  /**
   * Insere um grupo de usuários
   * @param {String} groupName - Nome do grupo
   * @param {String} groupIdentifier - Identificador do grupo
   * @returns {Object} JSON com informações sobre resultado da requisição, incluindo o status code
   */
  static async insertGrupoUsuarios(groupName, groupIdentifier) {
    return axios.post(requestUrl("grupos-usuarios"), {
      nome: `${groupName}`,
      identificador: `${groupIdentifier}`,
    });
  }
}
