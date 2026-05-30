import { Link } from "react-router-dom"; 
import "./NotFound.css"; 

const NotFound = () => {
  return (
    <div className="not-found">
        <h1>404</h1>
        <h2>Página não encontrada</h2>

        <p>A página que você tentou acessar não existe ou foi removida</p>

        <Link to="/" className="btn">
            Voltar para a Home
        </Link>
    </div>
  );
};

export default NotFound;