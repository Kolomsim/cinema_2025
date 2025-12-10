import { Card } from "antd";
import dayjs from "dayjs";
import "./ArticleCard.css";

const ArticleCard = ({ item }) => {
  return (
    <div className="card-container">
      <Card
        key={item.id}
        hoverable
        cover={<img className="card-img" src={item.imageUrl} />}
      >
        <Card.Meta
          className="card-meta"
          title={item.title}
          description={
            item.publishDate
              ? dayjs(item.publishDate).format("DD-MM-YYYY")
              : "Без даты"
          }
        />
      </Card>
    </div>
  );
};

export default ArticleCard;
