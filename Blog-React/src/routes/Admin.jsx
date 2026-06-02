import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import blogFetch from "../axios/config";
import "./Admin.css";

const Admin = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await blogFetch.get("/posts");

        setPosts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  const deletePost = async (id) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este post?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await blogFetch.delete(`/posts/${id}`);

      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id.toString() !== id.toString())
      );

      toast.success("Post excluído com sucesso!");
    } catch (error) {
      console.log(error);

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