import blogFetch from "../axios/config";
import { useEffect, useState } from "react"; // useEffect executa a busca quando a página carrega
import { useParams, useNavigate } from "react-router-dom"; // pega parâmetros dinâmicos da URL, como o id do post
import "./EditPost.css";

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState(""); // Guarda o título do post
  const [body, setBody] = useState(""); // Guarda o conteúdo do post
  const [imageUrl, setImageUrl] = useState(""); // Guarda a URL da imagem do post

  const getPost = async () => {
    // Função assíncrona para buscar um post específico na API
    try {
      const response = await blogFetch.get(`/posts/${id}`); // Faz GET em /posts/id usando o id da URL

      const data = response.data; // Pega os dados retornados pela API

      setTitle(data.title); // Salva o título recebido no estado
      setBody(data.body); // Salva o conteúdo recebido no estado
      setImageUrl(data.imageUrl || ""); // Salva a URL da imagem, se existir
    } catch (error) {
      console.log(error); // Mostra erro no console se a requisição falhar
    }
  };

  const editPost = async (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      alert("Preencha o título e o conteúdo do post.");
      return;
    }

    const post = {
      title,
      body,
      imageUrl,
      userId: 1,
    };

    try {
      await blogFetch.put(`/posts/${id}`, post); // Atualiza o post na API/json-server

      navigate(`/posts/${id}`); // Depois de editar, leva para a página individual do post
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost(); // Busca os dados do post quando a página carregar
  }, [id]); // Roda novamente apenas se o id mudar

  return (
    <div className="new-post">
      <h2>Editando: {title}</h2>

      <form onSubmit={editPost}>
        <div className="form-control">
          <label htmlFor="title">Título:</label>

          <input
            type="text"
            name="title"
            id="title"
            placeholder="Digite o título"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <div className="form-control">
          <label htmlFor="body">Conteúdo:</label>

          <textarea
            name="body"
            id="body"
            placeholder="Digite o conteúdo"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </div>

        <div className="form-control">
          <label htmlFor="imageUrl">URL da imagem:</label>

          <input
            type="url"
            name="imageUrl"
            id="imageUrl"
            placeholder="Cole a URL da imagem"
            onChange={(e) => setImageUrl(e.target.value)}
            value={imageUrl}
          />
        </div>

        <input type="submit" value="Editar Post" className="btn" />
      </form>
    </div>
  );
};

export default EditPost;