import axios from "axios";
import md5 from "md5";
import config from "../server/config";

let ts = Date.now;
let hash = md5(ts + config.marvel_private + config.marvel_public);

const AxiosInstance = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public",
  headers: { Accept: "*/*" },
  params: {
    apikey: config.marvel_public,
    ts: ts,
    hash: hash,
    limit: 22,
    offset: 100
  }
});

class MarvelAPI {

  static getEntity(entity) {
    return AxiosInstance.get("/" + entity);
  }
  static getCharacters() {
    return MarvelAPI.getEntity("characters");
  }
}
export default MarvelAPI;
