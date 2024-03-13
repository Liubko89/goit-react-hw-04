const ImageCard = ({ imageUrl, title }) => {
  return (
    <div>
      <img src={imageUrl} alt={title} width="250" />
    </div>
  );
};

export default ImageCard;
