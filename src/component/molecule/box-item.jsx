import { useNavigate } from "react-router-dom";

export default function BoxItem({ id, title, price, image, rating }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail-product/${id}`);
  };

  // Function to display the rating as stars
  const renderStars = (rate) => {
    const fullStars = Math.floor(rate);
    const halfStars = rate % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <i
              key={index}
              className="fa-solid fa-star text-yellow-500 text-sm"
            ></i>
          ))}
        {halfStars === 1 && (
          <i className="fa-solid fa-star-half-alt text-yellow-500 text-sm"></i>
        )}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <i
              key={index}
              className="fa-regular fa-star text-gray-300 text-sm"
            ></i>
          ))}
      </>
    );
  };

  return (
    <div
      className="border p-4 sm:p-4 rounded-lg shadow-md w-full sm:w-64 flex flex-col justify-between"
      onClick={handleClick}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-32 sm:h-40 object-cover mb-2 sm:mb-4"
        style={{ objectFit: "contain" }} // Gambar tetap proporsional
      />
      <h3 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2 line-clamp-1">
        {title}
      </h3>
      <div className="flex items-center mb-1 sm:mb-2">
        {renderStars(rating.rate)}
        <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600">
          ({rating.count})
        </span>
      </div>
      <p className="text-sm sm:text-lg font-bold text-green-600 mb-2 sm:mb-4">
        ${price}
      </p>
      <div className="flex justify-between items-center">
        <button className="px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-lg flex items-center text-xs sm:text-base">
          <i className="fa-solid fa-cart-shopping mr-1 sm:mr-2 text-xs sm:text-base"></i>{" "}
          Add to Cart
        </button>
        <button className="text-red-500 text-xl sm:text-2xl">
          <i className="fa-regular fa-heart"></i>
        </button>
      </div>
    </div>
  );
}
