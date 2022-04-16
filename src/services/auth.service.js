import axios from "axios";
import { API_URL_AUTH } from '../API_URLs';

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

const logout = () => {
  localStorage.removeItem("user");
};

const auth_services = {
  login,
  logout,
};

export default auth_services;
