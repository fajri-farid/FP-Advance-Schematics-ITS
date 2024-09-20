import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import StarRating from "../molecule/star-rating";
import Loader from "../atoms/loader";

export default function Detail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null); 
  const user = JSON.parse(sessionStorage.getItem("user"));
  const user_id = user ? user._id : null;

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

  const checkIfFavorited = async () => {
    try {
      const response = await fetch(
        `https://v1.appbackend.io/v1/rows/MRfrI6ooYDRn?user_id=${user_id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const favorites = result.data;

      if (Array.isArray(favorites)) {
        const favoriteItem = favorites.find(
          (item) => item.product_id === product.id && item.user_id === user_id
        );
        setIsFavorited(!!favoriteItem);
        if (favoriteItem) {
          setFavoriteId(favoriteItem._id); // Simpan ID favorit
        }
      } else {
        console.error("Expected favorites to be an array, but got:", favorites);
      }
    } catch (error) {
      console.error("Error checking favorites:", error);
    }
  };

  useEffect(() => {
    if (user_id && product) {
      checkIfFavorited();
    }
  }, [user_id, product]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  if (!user_id) {
    return <div>Please log in to add items to your cart.</div>;
  }

  const addToCart = async () => {
    const cartUrl = "https://v1.appbackend.io/v1/rows/NlqSRdbvsXUZ";
    try {
      const response = await fetch(cartUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            user_name: user_id,
            product_id: product.id,
            count: 1,
          },
        ]),
      });

      const result = await response.json();
      console.log("Item added to cart:", result);
      alert("Berhasil menambahkan produk ke keranjang!");
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const toggleFavorite = async () => {
    const url = "https://v1.appbackend.io/v1/rows/MRfrI6ooYDRn";

    if (isFavorited) {
      // Hapus dari wishlist
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([favoriteId]), 
        });

        const result = await response.json();
        console.log("Item removed from favorites:", result);
        setIsFavorited(false);
        setFavoriteId(null); 
      } catch (error) {
        console.error("Error removing item from favorites:", error);
      }
    } else {
    
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            {
              user_id: user_id,
              product_id: product.id,
            },
          ]),
        });

        const result = await response.json();
        console.log("Item added to favorites:", result);
        setIsFavorited(true);
        setFavoriteId(result.data._id); 
      } catch (error) {
        console.error("Error adding item to favorites:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center md:h-screen h-auto">
      <div className="flex flex-col md:flex-row justify-between p-4 md:p-8 w-full md:w-3/4 border border-gray-200 rounded-lg shadow-md">
        <div className="w-full md:w-1/2 flex justify-center items-center mb-4 md:mb-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-full md:w-3/4 h-auto border border-gray-300 rounded-lg p-4"
          />
        </div>

        <div className="w-full md:w-1/2 md:pl-8 mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            {product.title}
          </h1>
          <p className="text-sm md:text-lg mb-4">{product.description}</p>
          <p className="text-xl md:text-2xl font-semibold text-green-600 mb-4">
            ${product.price}
          </p>

          <div className="flex items-center mb-4">
            <div className="mr-2">
              <StarRating rate={product.rating.rate} />
            </div>
            <span className="text-sm md:text-base text-gray-600">
              ({product.rating.count} reviews)
            </span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={addToCart}
              className="px-4 md:px-6 py-2 bg-blue-500 text-white rounded-lg"
            >
              <i className="fa-solid fa-cart-shopping mr-2"></i> Add to Cart
            </button>

            <button
              onClick={toggleFavorite}
              className={`text-xl md:text-2xl ${
                isFavorited ? "text-red-500" : "text-gray-500"
              }`}
            >
              <i
                className={`fa-${isFavorited ? "solid" : "regular"} fa-heart`}
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
