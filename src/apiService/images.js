import axios from "axios";

const API_KEY = "823HEqS2ewmr54609XwtIm3eaTXYVh9brUtjtscCFr4";
axios.defaults.baseURL = "https://api.unsplash.com";
axios.defaults.headers.common["Authorization"] = API_KEY;
axios.defaults.params = {
  orientation: "landscape",
  per_page: 15,
};

export const getPhotos = async (query, page) => {
  const { data } = await axios.get(
    `search/users?client_id=${API_KEY}&query=${query}&page=${page}`
  );
  return data;
};
