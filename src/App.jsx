import { useState } from "react";
import { getPhotos } from "./apiService/images";
import SearchBar from "./components/SearchBar/SearchBar";
import { useEffect } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import toast from "react-hot-toast";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [modalAlt, setModalAlt] = useState("");

  useEffect(() => {
    if (!query) return;
    const fatchData = async () => {
      setIsLoading(true);
      try {
        const { results, total_pages } = await getPhotos(query, page);
        setImages((prevState) => [...prevState, ...results]);
        setIsVisible(page !== total_pages && total_pages !== 0);
        if (results.length === 0) {
          toast("There is nothing found", {
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
            iconTheme: {
              primary: "#713200",
              secondary: "#FFFAEE",
            },
          });
        }
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
    if (query === value) {
      toast(`You have already got the result by request '${value}'`, {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
      return;
    }
    setQuery(value);
    setImages([]);
    setPage(1);
    setError(false);
    setIsVisible(false);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleOpenModal = (url, alt) => {
    setShowModal(true);
    setModalUrl(url);
    setModalAlt(alt);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalUrl("");
    setModalAlt("");
  };

  return (
    <div className="container">
      <SearchBar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <ImageGallery results={images} onModalOpen={handleOpenModal} />
      {isVisible && <LoadMoreBtn onClick={loadMore} />}
      <ImageModal
        modalIsOpen={showModal}
        closeModal={handleCloseModal}
        src={modalUrl}
        alt={modalAlt}
      />
    </div>
  );
};

export default App;
