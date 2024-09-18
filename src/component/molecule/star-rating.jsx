const StarRating = ({ rate }) => {
  const fullStars = Math.floor(rate);
  const halfStars = rate % 1 !== 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <>
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <i
            key={`full-${index}`}
            className="fa-solid fa-star text-yellow-500"
          ></i>
        ))}
      {halfStars === 1 && (
        <i className="fa-solid fa-star-half-alt text-yellow-500"></i>
      )}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <i
            key={`empty-${index}`}
            className="fa-regular fa-star text-gray-300"
          ></i>
        ))}
    </>
  );
};

export default StarRating;
