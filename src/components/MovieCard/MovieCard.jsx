import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Card
        key={item.id}
        hoverable
        cover={<img className="card-img" src={"https://" + item.image} />}
        onClick={() => navigate(`/movie/${item.id}`)}
      >
        <Card.Meta
          className="card-meta"
          title={item.title}
          description={item.year}
        />
      </Card>
    </div>
  );
};

export default MovieCard;
