import axios from "axios";
/**
 * API_BASE=https://api.themoviedb.org/3/
 * URL_ROUTES=movie/now_playing?api_key=2132e6778ae98a68baf5051a583aaa54&language=pt-BR
 * API_TOKEN=2132e6778ae98a68baf5051a583aaa54
 */

const api = axios.create({ 
    baseURL: "https://api.themoviedb.org/3/",
 });

 export default api;