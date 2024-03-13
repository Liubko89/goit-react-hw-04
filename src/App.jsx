import { useState } from "react";
import { getPhotos } from "./apiService/images";
import SearchBar from "./components/SearchBar/SearchBar";
import { useEffect } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import toast from "react-hot-toast";

const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!query) return;
    const fatchData = async () => {
      setIsLoading(true);
      try {
        setQuery("");
        const { results, total_pages, total } = await getPhotos(query, page);
        setImages((prevState) => [...prevState, ...results]);
      } catch (error) {
        setError(true);
        toast.error("Oops, something went wrong, please try again later", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } finally {
        setIsLoading(false);
      }
    };

    fatchData();
  }, [page, query]);

  const handleSubmit = (value) => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setError(false);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <ImageGallery results={images} />
    </div>
  );
};

export default App;
