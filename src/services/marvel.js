import axios from "axios";
import md5 from "md5";

let ts = Date.now;
let hash = md5(
  ts + process.env.REACT_APP_PRIVATE_KEY + process.env.REACT_APP_PUBLIC_KEY
);

const AxiosInstance = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public",
  headers: { Accept: "*/*" },
  params: {
    apikey: process.env.REACT_APP_PUBLIC_KEY,
    ts: ts,
    hash: hash,
    limit: 20,
    offset: 100
  }
});

class MarvelAPI {
  static getEntity(entity, config) {
    return AxiosInstance.get("/" + entity, config);
  }
}
export default MarvelAPI;
