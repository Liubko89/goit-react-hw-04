import axios from "axios";

const API_KEY = "823HEqS2ewmr54609XwtIm3eaTXYVh9brUtjtscCFr4";
axios.defaults.baseURL = "https://api.unsplash.com";
axios.defaults.params = {
  orientation: "landscape",
  per_page: 20,
};

export const getPhotos = async (query, page) => {
  const { data } = await axios.get(
    `search/photos/?client_id=${API_KEY}&query=${query}&page=${page}`
  );

  return data;
};
