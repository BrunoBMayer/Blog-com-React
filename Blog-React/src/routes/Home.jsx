import { useState, useEffect } from "react"; // useState guarda os posts / useEffect executa algo quando a página carrega
import { Link } from "react-router-dom"; // Link cria navegação entre páginas sem recarregar o site
import blogFetch from "../axios/config"; // Axios faz requisições para APIs
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]); // Estado que começa vazio e depois guarda a lista de posts da API

  const getPosts = async () => { // Função assíncrona para buscar os posts na API
    try {
      const response = await blogFetch.get(
        "/posts"
      ); // Faz uma requisição GET para pegar os posts

      const data = response.data; // No Axios, os dados da resposta ficam em response.data

      setPosts(data); // Atualiza o estado posts com os dados recebidos da API
    } catch (error) {
      console.log(error); // Se der erro na requisição, mostra o erro no console
    }
  };

  useEffect(() => {
    getPosts(); // Chama a função quando o componente Home carregar
  }, []); // Array vazio faz o useEffect rodar apenas uma vez

  return (
    <div className="home">
      <h1>Últimos posts</h1>

      {/* Se ainda não tiver posts, mostra "Carregando...".
          Quando os posts chegarem da API, renderiza a lista com map */}
      {posts.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        posts.map((post) => ( // Percorre o array de posts e cria um bloco para cada post
          <div className="post" key={post.id}> {/* key ajuda o React a identificar cada item da lista */}
            <h2>{post.title}</h2>
            <p>{post.body}</p>

            <Link to={`/posts/${post.id}`} className="btn"> {/* Link dinâmico para a página específica do post */}
              Ler mais
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;