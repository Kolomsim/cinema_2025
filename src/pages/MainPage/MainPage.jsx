import { Flex, Statistic, Typography } from "antd";
import logo from "../../assets/Group 1.svg";
import { articles, genres } from "../../utils/mockData";
import "./MainPage.css";
import ArticleCard from "../../components/articleCard/ArticleCard";
import CategoryPreview from "../../components/category/CategoryPreview";
import { useEffect, useState } from "react";
import { getArticles, getGenres } from "../../utils/requests";

const MainPage = () => {
  const [articles, setArticles] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getArticles().then((res) => {
      setArticles(
        res.data.data.map((item) => {
          return {
            ...item,
            imageUrl: "https://" + item.imageUrl,
          };
        })
      );
    });
    getGenres({ top: true }).then((res) => {
      setGenres(res.data.data);
    });
  }, []);

  return (
    <div id="main-page">
      <div className="content-main-page">
        <img src={logo} />
      </div>
      <div className="content-main-page">
        <Typography.Text>
          Добро пожаловать в <b>CinemaBlog</b> – место, где кино становится
          страстью! Мы анализируем, обсуждаем и вдохновляемся лучшими фильмами
          всех времен. От голливудских блокбастеров до независимого арт-хауса –
          здесь есть кино для каждого.
        </Typography.Text>
      </div>
      <div className="content-main-page">
        <Typography.Title className="title" level={4}>
          Главное сегодня
        </Typography.Title>
      </div>
      <div className="content-main-page">
        <Flex gap={60}>
          {articles.map((item) => (
            <ArticleCard item={item} />
          ))}
        </Flex>
      </div>
      <div className="content-main-page">
        <Typography.Title className="title" level={4}>
          Жанры
        </Typography.Title>
      </div>
      <div className="content-main-page categories-container">
        {genres.map((item) => (
          <CategoryPreview item={item} />
        ))}
      </div>
      <Flex gap={60}>
        <Statistic title={"Фильмы"} value={115}></Statistic>
        <Statistic title={"Рецензии"} value={653}></Statistic>
      </Flex>
    </div>
  );
};

export default MainPage;
