import { Flex, Input, Pagination, Select } from "antd";
import "./MoviesPage.css";
import { moviesMock } from "../../utils/mockData";
import MovieCard from "../../components/movieCard/MovieCard";
import { getGenres, getMovies } from "../../utils/requests";
import { useEffect, useState } from "react";

const MoviesPage = () => {
  const [genreOptions, setGenreOptions] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies()
      .then((res) => {
        setMovies(res.data.data);
      })
      .catch((e) => console.warn(e));
    getGenres({ top: false })
      .then((res) => {
        setGenreOptions(
          res.data.data.map((item) => {
            return {
              label: item.name,
              value: item.name,
            };
          })
        );
      })
      .catch((e) => console.warn(e));
  }, []);

  return (
    <div id="movies-page">
      <Flex gap={30}>
        <Input.Search onSearch={() => {}} />
        <Select
          className="tag-select"
          mode="multiple"
          allowClear
          maxTagCount={2}
          options={genreOptions}
          onChange={() => {}}
        />
      </Flex>
      <div className="movies-list">
        {movies.map((item) => (
          <MovieCard item={item} />
        ))}
      </div>
      <Pagination showQuickJumper defaultCurrent={2} total={20} />
    </div>
  );
};

export default MoviesPage;
