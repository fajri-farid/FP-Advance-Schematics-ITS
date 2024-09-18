import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import StarRating from "../molecule/star-rating";
import Loader from "../atoms/loader";

export default function Detail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader /> {/* Gunakan komponen Loader */}
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-between p-8 w-3/4 border border-gray-200 rounded-lg shadow-md">
        {/* Left Section (Image) */}
        <div className="w-1/2 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-3/4 h-auto border border-gray-300 rounded-lg p-4"
          />
        </div>

        {/* Right Section (Details) */}
        <div className="w-1/2 pl-8 mx-auto">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-green-600 mb-4">
            ${product.price}
          </p>

          <div className="flex items-center mb-4">
            <div className="mr-2">
              <StarRating rate={product.rating.rate} />
            </div>
            <span className="text-gray-600">
              ({product.rating.count} reviews)
            </span>
          </div>

          <div className="flex gap-4">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg">
              <i className="fa-solid fa-cart-shopping mr-2"></i> Add to Cart
            </button>
            <button className="text-red-500 text-2xl">
              <i className="fa-regular fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
