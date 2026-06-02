import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import blogFetch from "../axios/config";
import { postSchema } from "../schemas/postSchema";
import "./EditPost.css";

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await blogFetch.get(`/posts/${id}`);

        setTitle(response.data.title);
        setBody(response.data.body);
        setImageUrl(response.data.imageUrl || "");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [id]);

  const editPost = async (e) => {
    e.preventDefault();

    const validation = postSchema.safeParse({
      title,
      body,
      imageUrl,
    });

    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      return;
    }

    const post = {
      ...validation.data,
      userId: 1,
    };

    try {
      await blogFetch.put(`/posts/${id}`, post);

      navigate(`/posts/${id}`);
    } catch (error) {
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