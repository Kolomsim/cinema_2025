import api from "./apiInstance";

export const signUp = async (body) => {
  const res = await api.post("/login", body);
  return res;
};

export const userInfo = async () => {
  const res = await api.get(`/user`);
  return res;
};

export const getMovies = async () => {
  const res = await api.get(`/movies`);
  return res;
};

export const getGenres = async (params) => {
  const res = await api.get(`/genres?top=${params.top}`);
  return res;
};

export const getArticles = async () => {
  const res = await api.get(`/mainInfo`);
  return res;
};

export const getMovie = async (movieId) => {
  const res = await api.get(`/movies/${movieId}`);
  return res;
};
