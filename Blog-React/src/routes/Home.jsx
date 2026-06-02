import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogFetch from "../axios/config";
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]); // Guarda a lista de posts recebida da API
  const [search, setSearch] = useState(""); // Guarda o texto digitado na barra de pesquisa
  const [loading, setLoading] = useState(true); // Controla se os posts ainda estão carregando

  useEffect(() => {
    const getPosts = async () => {
      try {
        // Faz uma requisição GET para buscar os posts na API
        const response = await blogFetch.get("/posts");

        // Atualiza o estado posts com os dados recebidos da API
        setPosts(response.data);
      } catch (error) {
        // Mostra o erro no console caso a requisição falhe
        console.log(error);
      } finally {
        // Finaliza o carregamento, independentemente de ter dado certo ou erro
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  // Filtra os posts pelo título digitado na barra de pesquisa.
  // O toLowerCase evita diferença entre letras maiúsculas e minúsculas.
  // O slice limita a exibição aos 10 primeiros posts filtrados.
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
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : filteredPosts.length === 0 ? (
        <p>Nenhum post encontrado.</p>
      ) : (
        <div className="posts-grid">
          {filteredPosts.map((post) => (
            <div className="post" key={post.id}>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="post-image"
                />
              )}

              <h2>{post.title}</h2>
              <p>{post.body}</p>

              <Link to={`/posts/${post.id}`} className="btn">
                Ler mais
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;