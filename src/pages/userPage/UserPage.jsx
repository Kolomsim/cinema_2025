import { Descriptions, Flex, Pagination, Typography, Button } from "antd";
import "./UserPage.css";
import { useAuth } from "../loginPage/AuthContext";
import { useEffect, useState } from "react";
import MovieCard from "../../components/movieCard/MovieCard";
import { userInfo } from "../../utils/requests";

const UserPage = () => {
  const { logout } = useAuth();
  const [userInfoData, setUserInfo] = useState({});
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    userInfo().then((res) => {
      setUserInfo(res.data.data);
      setMovies(res.data.data.movies);
    });
  }, []);

  const descriptionsItems = [
    { label: "имя", children: userInfoData.name },
    { label: "почта", children: userInfoData.email },
    { label: "роль", children: userInfoData.role },
    {
      label: "любимые жанры",
      children: (userInfoData.genres || []).toString().replace(",", ", "),
    },
  ];
  return (
    <div id="movies-page">
      <Flex gap={50}></Flex>
      <div className="content-user-container">
        <Descriptions
          style={{ width: "500px" }}
          column={1}
          colon={false}
          bordered
          title={<Typography.Title>Обо мне</Typography.Title>}
          items={descriptionsItems}
        ></Descriptions>
      </div>
      <Button danger onClick={() => logout()}>
        Выйти
      </Button>
      <Typography.Title>Сохраненные фильмы</Typography.Title>
      <div className="movies-list">
        {movies.map((item) => (
          <MovieCard item={item} />
        ))}
      </div>
      <Pagination showQuickJumper defaultCurrent={2} total={20} />
    </div>
  );
};

export default UserPage;
