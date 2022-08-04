import axios from "axios";
import { BASE_URL } from ".";

export const cryptoAPI = () => {
  return axios.get(
    `${BASE_URL}/currencies/ticker?key=${import.meta.env.VITE_NOMICS_API_KEY}`
  );
};
