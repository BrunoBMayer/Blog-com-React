import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import blogFetch from "../axios/config";
import "./Post.css";

const Post = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await blogFetch.get(`/posts/${id}`);

        setPost(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [id]);

  if (loading) {
    return <p>Carregando post...</p>;
  }

  if (!post) {
    return (
      <div className="post-detail">
        <h1>Post não encontrado</h1>

        <Link to="/" className="btn">
          Voltar para Home
        </Link>
      </div>
    );
  }

  return (
    <div className="post-detail">
      <span className="post-category">Curiosidade</span>

      <h1>{post.title}</h1>

      <p className="post-meta">Publicado no Blog React</p>

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="post-detail-image"
        />
      )}

      <div className="post-content">
        <p>{post.body}</p>
      </div>

      <Link to="/" className="btn">
        Voltar para Home
      </Link>
    </div>
  );
};

export default Post;