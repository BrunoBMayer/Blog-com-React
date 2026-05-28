import blogFetch from "../axios/config"; 
import { useEffect, useState } from "react"; // useEffect executa a busca quando a página carrega
import { useParams, useNavigate } from "react-router-dom"; // pega parâmetros dinâmicos da URL, como o id do post 
import "./EditPost.css"; 

const EditPost = () => {

    const navigate = useNavigate(); 
    const [title, setTitle] = useState(); 
    const [body, setBody] = useState(); 
    const { id } = useParams(); 

  return (
        <div className="new-post"> {/* Container principal da página de criação de post */}
      <h2>Editando: {title}</h2>

      <form onSubmit={(e) => editPost(e)}> {/* ao enviar o formulário, chama a função createPost */}
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
          value="Editar Post" 
          className="btn" 
        /> {/* Botão que envia o formulário */}
      </form>
    </div>
  )
}

export default EditPost