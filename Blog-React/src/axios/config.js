//Centraliza a configuração do Axios para não precisar repetir a URL inteira da API o tempo todo 
import axios from "axios"; 

const blogFetch = axios.create({ //Instância personalizada do Axios (“Vou criar uma versão do Axios já configurada para a API do blog.”)
  baseURL: "https://jsonplaceholder.typicode.com", // URL base da API, evita repetir o endereço completo
  headers: {
    "Content-Type": "application/json", // informa que os dados serão trabalhados em formato JSON
  },
});

export default blogFetch; 
