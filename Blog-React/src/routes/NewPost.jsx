import "./NewPost.css"; 

const NewPost = () => {
  return (
    <div className="new-post"> {/* Container principal da página de criação de post */}
      <h2>Inserir novo Post:</h2>

      <form> 
        <div className="form-control"> {/* Agrupa label + input para facilitar a estilização */}
          <label htmlFor="title">Título:</label> {/* htmlFor conecta o label ao input com id="title" */}
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Digite o título"
          />
        </div>

        <div className="form-control">
          <label htmlFor="body">Conteúdo:</label> {/* Conecta o label ao textarea com id="body" */}
          <textarea
            name="body"
            id="body"
            placeholder="Digite o conteúdo"
          ></textarea>
        </div>

        <input 
          type="submit" 
          value="Criar Post" 
          className="btn" 
        /> {/* Botão que envia o formulário */}
      </form>
    </div>
  )
}

export default NewPost