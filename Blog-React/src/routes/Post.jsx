import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import blogFetch from "../axios/config";
import "./Post.css";

const Post = () => {
  const { id } = useParams(); // Pega o id que vem da URL, exemplo: /posts/1

  const [post, setPost] = useState(null); // Guarda os dados do post específico
  const [loading, setLoading] = useState(true); // Controla se a página ainda está carregando

  useEffect(() => {
    const getPost = async () => { 
      try {
        // Busca na API o post correspondente ao id que veio da URL
        const response = await blogFetch.get(`/posts/${id}`);

        // Salva os dados do post no estado
        setPost(response.data);
      } catch (error) {
        // Mostra o erro no console caso a requisição falhe
        console.log(error);
      } finally {
        // Finaliza o carregamento, independentemente de ter dado certo ou erro
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

// A função getPost é assíncrona porque faz uma requisição para a API. Como essa resposta não chega
// instantaneamente, usamos async na função e await na requisição para esperar os dados antes de 
// continuar o código.

//O Post.jsx é a página de detalhes de um post. Ele pega o id da URL usando useParams, 
//faz uma requisição para buscar aquele post específico na API e exibe título, conteúdo e imagem,
//caso exista. Ele também trata o estado de carregamento e mostra uma mensagem caso o post não seja encontrado.