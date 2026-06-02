import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import blogFetch from "../axios/config";
import { postSchema } from "../schemas/postSchema";
import "./NewPost.css";

const NewPost = () => {
  const navigate = useNavigate(); // Permite redirecionar o usuário para outra rota pelo código

  const [title, setTitle] = useState(""); // Guarda o título digitado no formulário
  const [body, setBody] = useState(""); // Guarda o conteúdo digitado no formulário
  const [imageUrl, setImageUrl] = useState(""); // Guarda a URL da imagem digitada no formulário

  const createPost = async (e) => {
    // Impede o comportamento padrão do formulário, que seria recarregar a página
    e.preventDefault();

    // Valida os dados do formulário usando o schema criado com Zod
    const validation = postSchema.safeParse({
      title,
      body,
      imageUrl,
    });

    // Se a validação falhar, exibe a primeira mensagem de erro e interrompe a criação do post
    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      return;
    }

    // Cria o objeto do novo post usando os dados já validados
    const post = {
      ...validation.data,
      userId: 1,
    };

    try {
      // Envia o novo post para a API
      await blogFetch.post("/posts", post);

      // Após criar o post, redireciona o usuário para a página inicial
      navigate("/");
    } catch (error) {
      // Mostra o erro no console caso a requisição falhe
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

// onChange: Quando o valor desse campo mudar, execute essa função.
// (e) -> : evento gerado pelo input. Ele guarda informações sobre o que aconteceu.
// e.target: É o elemento que disparou o evento. Nesse caso, o próprio <input>.
// e.target.value: É o valor atual digitado dentro do input.
// setTitle(e.target.value): Atualiza o estado title com o texto que o usuário digitou.

// O NewPost.jsx é a página responsável por criar novos posts. Ele guarda os valores digitados 
// no formulário usando useState, valida esses dados com o postSchema, mostra um toast caso exista
//  erro de validação e, se estiver tudo certo, envia o post para a API usando blogFetch.post.
//  Depois disso, redireciona o usuário para a Home com useNavigate.