import { useState, useEffect, useCallback } from "react";
import BoxItem from "./../molecule/box-item";
import Loader from "../atoms/loader";

export default function WishlistOrganism() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const user_id = user ? user._id : null;

  useEffect(() => {
    console.log("User from session:", user);
    console.log("User ID:", user_id);
  }, [user]);

  const fetchWishlistItems = useCallback(async () => {
    if (!user_id) return;

    setIsLoading(true);
    try {
      const wishlistResponse = await fetch(
        "https://v1.appbackend.io/v1/rows/MRfrI6ooYDRn"
      );
      const wishlistData = await wishlistResponse.json();
      console.log("Wishlist Data:", wishlistData);

      const filteredWishlistData = wishlistData.data.filter(
        (item) => item.user_id === user_id
      );
      console.log("Filtered Wishlist Data:", filteredWishlistData);

      // Fetch product data
      const productResponse = await fetch("https://fakestoreapi.com/products");
      const productData = await productResponse.json();
      console.log("Product Data:", productData);

      const mappedWishlistItems = filteredWishlistData.map((wishlistItem) => {
        const product = productData.find(
          (p) => p.id === wishlistItem.product_id
        );
        return {
          ...wishlistItem,
          title: product ? product.title : "Unknown Product",
          price: product ? product.price : 0,
          image: product ? product.image : "",
          rating: product ? product.rating : { rate: 0, count: 0 },
        };
      });

      setWishlistItems(mappedWishlistItems);
    } catch (error) {
      console.error("Error fetching wishlist or product data", error);
    } finally {
      setIsLoading(false);
    }
  }, [user_id]);

  useEffect(() => {
    fetchWishlistItems();
  }, [fetchWishlistItems]);

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Wishlist</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-30">
          <Loader />
        </div>
      ) : wishlistItems.length === 0 ? (
        <div className="text-center text-gray-500">Wishlist kosong</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-4">
          {wishlistItems.map((item) => (
            <BoxItem
              key={item._id}
              id={item.product_id}
              title={item.title}
              price={item.price}
              image={item.image}
              rating={item.rating}
            />
          ))}
        </div>
      )}
    </div>
  );
}
