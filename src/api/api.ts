import axios from "axios";
import AuthAPI from "./auth.api";
import ListsAPI from "./lists.api";

const BASE_URL_AUTH = "https://moneyfulpublicpolicy.co.kr/";
// const BASE_URL_LISTS = "https://alluring-ambitious-forest.glitch.me/account/";
const BASE_URL_LISTS = `${import.meta.env.VITE_BASEURL}/account/`;
console.log("123", import.meta.env.VITE_BASEURL);

class API {
  auth;
  lists;

  constructor() {
    this.auth = new AuthAPI(axios.create({ baseURL: BASE_URL_AUTH }));
    this.lists = new ListsAPI(axios.create({ baseURL: BASE_URL_LISTS }));
  }
}

const api = new API();

export default api;
