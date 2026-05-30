import { useState, useEffect } from "react";
import blogFetch from "../axios/config";
import { Link } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  const [posts, setPosts] = useState([]); // Estado que guarda a lista de posts da API

  const getPosts = async () => {
    try {
      const response = await blogFetch.get("/posts"); // Busca todos os posts da API

      const data = response.data; // Pega os dados retornados pela API

      setPosts(data); // Salva os posts no estado
    } catch (error) {
      console.log(error); // Mostra o erro no console caso a requisição falhe
    }
  };

const deletePost = async (id) => {
  const confirmDelete = window.confirm(  // confirmação antes d excluir
    "Tem certeza que deseja excluir este post?"
  ); 

  if (!confirmDelete){
    return;
  }

  await blogFetch.delete(`/posts/${id}`); // envia uma requisição DELETE para excluir o post na API

  const filteredPosts = posts.filter((post) => post.id !== id); // cria uma nova lista sem o post excluído

  setPosts(filteredPosts); // atualiza o estado e remove o post da tela
};


  useEffect(() => {
    getPosts(); // Chama a função quando a página Admin carregar
  }, []);

  return (
    <div className="admin"> {/* Container principal da página de administração */}
      <h1>Gerenciar Posts</h1>

      {/* Se a lista de posts ainda estiver vazia, mostra "Carregando...".
          Quando os posts chegarem, renderiza a lista com map */}
      {posts.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        posts.map((post) => ( // Percorre a lista de posts e cria um bloco para cada post
          <div className="post" key={post.id}> {/* key ajuda o React a identificar cada post da lista */}
            <h2>{post.title}</h2> {/* Mostra o título do post */}

            <div className="actions"> {/* Área dos botões de ação do post */}
              <Link className="btn edit-btn" to={`/posts/edit/${post.id}`}>Editar</Link> {/* Botão/link para editar o post */}
              <button className="btn delete-btn" onClick={() => deletePost(post.id)}>Excluir</button> {/* Botão para excluir o post */}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Admin;