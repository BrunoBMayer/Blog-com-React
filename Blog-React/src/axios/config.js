// Centraliza a configuração do Axios para não precisar repetir a URL inteira da API o tempo todo
import axios from "axios";

const blogFetch = axios.create({
  // URL base da API local criada com json-server
  baseURL: "http://localhost:3000",

  headers: {
    // Informa que os dados enviados/recebidos serão em formato JSON
    "Content-Type": "application/json",
  },
});

export default blogFetch;