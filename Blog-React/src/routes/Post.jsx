import blogFetch from "../axios/config"; 
import { useEffect, useState } from "react"; // useEffect executa a busca quando a página carrega
import { useParams } from "react-router-dom"; // pega parâmetros dinâmicos da URL, como o id do post
import "./Post.css"; 

const Post = () => {
  const [post, setPost] = useState({}); // estado que começa como objeto vazio e depois guarda o post da API

  const { id } = useParams(); // pega o id da URL. Ex: /posts/3 => id = 3

  const getPost = async () => { // função assíncrona para buscar um post específico na API
    try {

      const response = await blogFetch.get(`/posts/${id}`); // faz GET em /posts/id usando o id da URL
      const data = response.data; // pega os dados retornados pela API
      setPost(data); // salva o post recebido no estado

    } catch (error) {
      console.log(error); // mostra erro no console se a requisição falhar
    }
  };

  useEffect(() => {
    getPost(); // chama a função quando a página Post carregar
  }, []); // array vazio faz o useEffect executar apenas uma vez

  return (
    <div className="post-container"> 
      {!post.title ? ( // se o post ainda não tiver title, significa que ainda está carregando
        <p>Carregando...</p>
      ) : (
        <div className="post"> 
          <h2>{post.title}</h2> 
          <p>{post.body}</p> 
        </div>
      )}
    </div>
  );
};

export default Post;