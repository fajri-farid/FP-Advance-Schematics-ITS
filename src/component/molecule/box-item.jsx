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
            <i key={index} className="fa-solid fa-star text-yellow-500"></i>
          ))}
        {halfStars === 1 && (
          <i className="fa-solid fa-star-half-alt text-yellow-500"></i>
        )}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <i key={index} className="fa-regular fa-star text-gray-300"></i>
          ))}
      </>
    );
  };

  return (
    <div
      className="border p-4 rounded-lg shadow-md w-64 flex flex-col justify-between"
      onClick={handleClick}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover mb-4"
        style={{ objectFit: "contain" }} // Gambar tetap proporsional
      />
      <h3 className="text-lg font-semibold mb-2 line-clamp-1">{title}</h3>
      <div className="flex items-center mb-2">
        {renderStars(rating.rate)}
        <span className="ml-2 text-sm text-gray-600">({rating.count})</span>
      </div>
      <p className="text-lg font-bold text-green-600 mb-4">${price}</p>
      <div className="flex justify-between items-center">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center">
          <i className="fa-solid fa-cart-shopping mr-2"></i> Add to Cart
        </button>
        <button className="text-red-500 text-2xl">
          <i className="fa-regular fa-heart"></i>
        </button>
      </div>
    </div>
  );
}
