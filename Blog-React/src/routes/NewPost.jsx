import "./NewPost.css"; 
import blogFetch from "../axios/config"; // importa a configuração personalizada do Axios
import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; // permite redirecionar o usuário pelo código

/* onChange executa uma função toda vez que o usuário altera/digita em um campo. */
/* e significa event, ou seja, o evento que aconteceu. */

const NewPost = () => {
  const navigate = useNavigate(); // cria a função usada para navegar/redirecionar entre rotas

  const [title, setTitle] = useState(""); // estado que guarda o título digitado
  const [body, setBody] = useState(""); // estado que guarda o conteúdo digitado

  const createPost = async (e) => {
    e.preventDefault(); // impede o reload da página, pois o envio será controlado pelo React

    const post = { title, body, userId: 1 }; // cria um objeto com os dados digitados no formulário

    await blogFetch.post("/posts", post); // envia esse objeto para a API usando o método POST

    navigate("/"); // redireciona o usuário para a Home depois do envio
  };

  return (
    <div className="new-post"> {/* Container principal da página de criação de post */}
      <h2>Inserir novo Post:</h2>

      <form onSubmit={(e) => createPost(e)}> {/* ao enviar o formulário, chama a função createPost */}
        <div className="form-control"> {/* Agrupa label + input para facilitar a estilização */}
          <label htmlFor="title">Título:</label> {/* htmlFor conecta o label ao input com id="title" */}
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Digite o título"
            onChange={(e) => setTitle(e.target.value)} // atualiza o estado title com o valor digitado
          />
        </div>

        <div className="form-control">
          <label htmlFor="body">Conteúdo:</label> {/* Conecta o label ao textarea com id="body" */}
          <textarea
            name="body"
            id="body"
            placeholder="Digite o conteúdo"
            onChange={(e) => setBody(e.target.value)} // atualiza o estado body com o valor digitado
          ></textarea>
        </div>

        <input 
          type="submit" 
          value="Criar Post" 
          className="btn" 
        /> {/* Botão que envia o formulário */}
      </form>
    </div>
  );
};

export default NewPost;