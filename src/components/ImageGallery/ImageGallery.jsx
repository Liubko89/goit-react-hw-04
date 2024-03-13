import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ results }) => {
  return (
    <ul>
      {results.map((result) => {
        return (
          <li key={result.id}>
            <ImageCard
              imageUrl={result.profile_image.large}
              title={result.name}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
