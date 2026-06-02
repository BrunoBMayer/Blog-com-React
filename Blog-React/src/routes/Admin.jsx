import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import blogFetch from "../axios/config";
import "./Admin.css";

const Admin = () => {
  const [posts, setPosts] = useState([]); // Guarda a lista de posts recebida da API
  const [loading, setLoading] = useState(true); // Controla se os posts ainda estão carregando

  useEffect(() => {
    const getPosts = async () => {
      try {
        // Busca todos os posts da API
        const response = await blogFetch.get("/posts");

        // Atualiza o estado com os posts recebidos da API
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

  const deletePost = async (id) => {
    // Exibe uma confirmação antes de excluir o post
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este post?"
    );

    // Se o usuário cancelar, a função para aqui
    if (!confirmDelete) {
      return;
    }

    try {
      // Envia uma requisição DELETE para excluir o post na API
      await blogFetch.delete(`/posts/${id}`);

      // Atualiza a lista de posts, removendo da tela o post excluído
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id.toString() !== id.toString())
      );

      // Exibe mensagem de sucesso usando toast
      toast.success("Post excluído com sucesso!");
    } catch (error) {
      // Mostra o erro no console caso a exclusão falhe
      console.log(error);

      // Exibe mensagem de erro para o usuário
      toast.error("Não foi possível excluir o post.");
    }
  };

  return (
    <div className="admin">
      <h1>Gerenciar Posts</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : posts.length === 0 ? (
        <p>Nenhum post cadastrado.</p>
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
                    type="button"
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

// O Admin.jsx é a página de gerenciamento dos posts. Ele busca todos os posts da API,
//  mostra cada um em formato de card e permite editar ou excluir posts. A edição leva 
// para a rota /posts/edit/:id, e a exclusão faz uma requisição DELETE para a API, 
// atualizando a lista na tela logo depois.