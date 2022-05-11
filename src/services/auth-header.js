/**
 * Obtém o usuário da localStorage e retorna seu token
 * @returns {Object} Token do usuário caso ele esteja logado
 */
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.accessToken) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
}
