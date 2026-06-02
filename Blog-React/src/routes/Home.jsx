import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogFetch from "../axios/config";
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
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