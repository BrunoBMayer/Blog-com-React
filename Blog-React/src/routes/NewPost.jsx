import { useState } from "react";
import { useNavigate } from "react-router-dom";
import blogFetch from "../axios/config";
import "./NewPost.css";

const NewPost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState(""); // Guarda o título do post
  const [body, setBody] = useState(""); // Guarda o conteúdo do post
  const [imageUrl, setImageUrl] = useState(""); // Guarda a URL da imagem do post

  const createPost = async (e) => {
    e.preventDefault(); // Evita o recarregamento da página ao enviar o formulário

    const post = {
      title,
      body,
      imageUrl,
    };

    try {
      await blogFetch.post("/posts", post); // Envia o novo post para o JSON Server

      navigate("/"); // Redireciona para a Home depois de criar o post
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new-post">
      <h1>Criar novo post</h1>

      <form onSubmit={createPost}>
        <div className="form-control">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Digite o título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="body">Conteúdo:</label>
          <textarea
            name="body"
            id="body"
            placeholder="Digite o conteúdo"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>

        <div className="form-control">
          <label htmlFor="imageUrl">URL da imagem:</label>
          <input
            type="url"
            name="imageUrl"
            id="imageUrl"
            placeholder="Cole a URL da imagem"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <input type="submit" value="Criar Post" className="btn" />
      </form>
    </div>
  );
};

export default NewPost;