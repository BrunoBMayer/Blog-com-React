import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import blogFetch from "../axios/config";
import { postSchema } from "../schemas/postSchema";
import "./EditPost.css";

const EditPost = () => {
  const navigate = useNavigate(); // Permite redirecionar o usuário para outra rota pelo código
  const { id } = useParams(); // Pega o id que vem da URL, exemplo: /posts/edit/1

  const [title, setTitle] = useState(""); // Guarda o título do post
  const [body, setBody] = useState(""); // Guarda o conteúdo do post
  const [imageUrl, setImageUrl] = useState(""); // Guarda a URL da imagem do post
  const [loading, setLoading] = useState(true); // Controla o carregamento dos dados do post

  useEffect(() => {
    const getPost = async () => {
      try {
        // Busca na API o post correspondente ao id que veio da URL
        const response = await blogFetch.get(`/posts/${id}`);

        // Preenche os campos do formulário com os dados recebidos da API
        setTitle(response.data.title);
        setBody(response.data.body);
        setImageUrl(response.data.imageUrl || "");
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

  const editPost = async (e) => {
    // Impede o comportamento padrão do formulário, que seria recarregar a página
    e.preventDefault();

    // Valida os dados do formulário usando o schema criado com Zod
    const validation = postSchema.safeParse({
      title,
      body,
      imageUrl,
    });

    // Se a validação falhar, exibe a primeira mensagem de erro e interrompe a edição
    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      return;
    }

    // Cria o objeto do post atualizado usando os dados já validados
    const post = {
      ...validation.data,
      userId: 1,
    };

    try {
      // Atualiza o post na API
      await blogFetch.put(`/posts/${id}`, post);

      // Após editar, redireciona o usuário para a página de detalhes do post
      navigate(`/posts/${id}`);
    } catch (error) {
      // Mostra o erro no console caso a requisição falhe
      console.log(error);
    }
  };

  if (loading) {
    return <p>Carregando post...</p>;
  }

  return (
    <div className="edit-post">
      <h1>Editando: {title}</h1>

      <form onSubmit={editPost}>
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

        <input type="submit" value="Editar Post" className="btn" />
      </form>
    </div>
  );
};

export default EditPost;

// O EditPost.jsx é a página responsável por editar um post existente. Ele pega o id da URL com useParams,
//  busca os dados atuais do post na API, preenche o formulário com esses dados e permite alterar 
// título, conteúdo e imagem. Ao enviar, ele valida os dados com o postSchema, atualiza o post
//  usando blogFetch.put e redireciona para a página de detalhes do post editado.