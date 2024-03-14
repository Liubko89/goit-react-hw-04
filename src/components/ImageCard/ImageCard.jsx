import css from "./ImageCard.module.css";

const ImageCard = ({ imageUrl, imageUrlFull, title, onModalOpen }) => {
  return (
    <div
      className={css.imgContainer}
      onClick={() => {
        onModalOpen(imageUrlFull, title);
      }}
    >
      <img className={css.image} src={imageUrl} alt={title} width="250" />
    </div>
  );
};

export default ImageCard;
