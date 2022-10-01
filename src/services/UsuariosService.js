import axios from "axios";
import requestUrl from "../helpers/requestURL";

/**
 * Classe que executa ações relacionadas a usuários através do envio de requisições à API
 */
export default class UsuariosService {
  /**
   * Insere um usuario (por enquanto, sempre com o nível de acesso "Administrador de Grupo" (Role de id = 2))
   * @param {String} username - Nome completo do usuário
   * @param {String} email - Endereço de e-mail do usuário
   * @param {String} password - Senha escolhida pelo usuário
   * @param {number} idGrupoUsuario - Id do grupo de usuários
   * @returns {Object} JSON com informações sobre resultado da requisição, incluindo o status code
   */
  static async insertUsuario(username, email, password, idGrupoUsuario) {
    return axios.post(requestUrl("usuarios"), {
      username: `${username}`,
      email: `${email}`,
      password: `${password}`,
      roles: [
        {
          id: 2,
        },
      ],
      grupoUsuarios: {
        id: `${idGrupoUsuario}`,
      },
    });
  }
}
