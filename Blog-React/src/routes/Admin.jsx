import { useState, useEffect } from "react";
import blogFetch from "../axios/config";
import { Link } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  const [posts, setPosts] = useState([]); // Estado que guarda a lista de posts da API
  const [message, setMessage] = useState(""); // Guarda o texto da mensagem de sucesso

  const getPosts = async () => {
    try {
      const response = await blogFetch.get("/posts"); // Busca todos os posts da API

      const data = response.data; // Pega os dados retornados pela API

      setPosts(data); // Salva os posts no estado
    } catch (error) {
      console.log(error); // Mostra o erro no console caso a requisição falhe
    }
  };

  const deletePost = async (id) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este post?"
    ); // Confirmação antes de excluir

    if (!confirmDelete) {
      return;
    }

    try {
      await blogFetch.delete(`/posts/${id}`); // Envia uma requisição DELETE para excluir o post na API

      const filteredPosts = posts.filter(
        (post) => post.id.toString() !== id.toString()
      ); // Cria uma nova lista sem o post excluído

      setPosts(filteredPosts); // Atualiza o estado e remove o post da tela

      setMessage("Post excluído com sucesso!"); // Mostra mensagem de sucesso

      setTimeout(() => {
        setMessage(""); // Limpa a mensagem depois de 5 segundos
      }, 5000);
    } catch (error) {
      console.log(error); // Mostra o erro no console caso a exclusão falhe
    }
  };

  useEffect(() => {
    getPosts(); // Chama a função quando a página Admin carregar
  }, []);

  return (
    <div className="admin">
      {/* Container principal da página de administração */}
      <h1>Gerenciar Posts</h1>

      {message && <p className="success-message">{message}</p>}

      {/* Se a lista de posts ainda estiver vazia, mostra "Carregando...".
          Quando os posts chegarem, renderiza a lista com map */}
      {posts.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        <div className="admin-grid">
          {posts.map((post) => (
            <div className="admin-card" key={post.id}>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="admin-card-image"
                />
              )}

              <div className="admin-card-content">
                <h2>{post.title}</h2>

                <div className="actions">
                  <Link className="btn edit-btn" to={`/posts/edit/${post.id}`}>
                    Editar
                  </Link>

                  <button
                    className="btn delete-btn"
                    onClick={() => deletePost(post.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;