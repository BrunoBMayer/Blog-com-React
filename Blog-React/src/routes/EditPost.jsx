import blogFetch from "../axios/config"; 
import { useEffect, useState } from "react"; // useEffect executa a busca quando a página carrega
import { useParams, useNavigate } from "react-router-dom"; // pega parâmetros dinâmicos da URL, como o id do post 
import "./EditPost.css"; 

const EditPost = () => {

    const navigate = useNavigate(); 
    const [title, setTitle] = useState(""); 
    const [body, setBody] = useState(""); 
    const { id } = useParams(); 

      const getPost = async () => { // função assíncrona para buscar um post específico na API
    try {

      const response = await blogFetch.get(`/posts/${id}`); // faz GET em /posts/id usando o id da URL
      const data = response.data; // pega os dados retornados pela API
      setTitle(data.title); // salva o post recebido no estado
      setBody(data.body); 

    } catch (error) {
      console.log(error); // mostra erro no console se a requisição falhar
    }
  };
    const editPost = async(e) => {
      e.preventDefault(); 

      if(!title.trim() || !body.trim()){
        alert("Preencha o título e o conteúdo do post.");
        return; 
      }

      const post = {title, body, userId: 1}; 

      await blogFetch.put(`/post/${id}`, {
        body: post,
      });
    };


    useEffect(() =>{
      getPost(); 
    })

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
            value={title || ""}
          />
        </div>

        <div className="form-control">
          <label htmlFor="body">Conteúdo:</label> {/* Conecta o label ao textarea com id="body" */}
          <textarea
            name="body"
            id="body"
            placeholder="Digite o conteúdo"
            onChange={(e) => setBody(e.target.value)} // atualiza o estado body com o valor digitado
            value={body || ""}
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