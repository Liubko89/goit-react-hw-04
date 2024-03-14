import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ results, onModalOpen }) => {
  return (
    <ul className={css.list}>
      {results.map((result) => {
        return (
          <li key={result.id} className={css.item}>
            <ImageCard
              imageUrlFull={result.urls.regular}
              imageUrl={result.urls.small}
              title={result.alt_description}
              onModalOpen={onModalOpen}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
