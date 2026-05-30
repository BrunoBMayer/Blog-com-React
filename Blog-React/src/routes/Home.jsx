import { useState, useEffect } from "react"; // useState guarda os posts / useEffect executa algo quando a página carrega
import { Link } from "react-router-dom"; // Link cria navegação entre páginas sem recarregar o site
import blogFetch from "../axios/config"; // Axios faz requisições para APIs
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]); // Estado que começa vazio e depois guarda a lista de posts da API
  const [search, setSearch] = useState(""); //guardar oq o usuário digitar na barra d pesquisa

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

// Filtra os posts pelo título digitado na barra de pesquisa
// toLowerCase() evita diferença entre maiúsculas e minúsculas
// includes() verifica se o título contém o texto pesquisado
const filteredPosts = posts
  .filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  )
  .slice(0, 10);

  return (
    <div className="home">
      <h1>Últimos posts</h1>

      <div className="search-container">
        <input
         type="text"
         placeholder="Pesquisar posts pelo título..."
         value={search}
         onChange={(e) => setSearch(e.target.value)}  // Ao digitar nesse input, ele pega o valor atual digitado e salva dentro do estado search.” (onChange é acionado toda vez q o input muda e o "e" guarda as info do q aconteceu)
          />
      </div>

      {/* Se ainda não tiver posts, mostra "Carregando...".
          Quando os posts chegarem da API, renderiza a lista com map */}
        {posts.length === 0 ? (
      <p>Carregando...</p>
    ) : filteredPosts.length === 0 ? (
      <p>Nenhum post encontrado.</p>
    ) : (
      filteredPosts.map((post) => (
        <div className="post" key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>

          <Link to={`/posts/${post.id}`} className="btn">
            Ler mais
          </Link>
        </div>
      ))
    )}
    </div>
  );
};

export default Home;