import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "e53839e522a3a600e04cb1481fdbaf90",
    language: "ko-KR",
  },
});

export default instance;
