import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CartItem from "./../molecule/cart-item";
import Loader from "../atoms/loader";

function CartList() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const user_id = user ? user._id : null;

  const fetchCartItems = useCallback(async () => {
    if (!user_id) return;

    setIsLoading(true);
    try {
      const [cartResponse, productResponse] = await Promise.all([
        axios.get("https://v1.appbackend.io/v1/rows/NlqSRdbvsXUZ"),
        axios.get("https://fakestoreapi.com/products"),
      ]);

      const cartData = cartResponse.data;
      const productData = productResponse.data;

      const filteredCartData = cartData.data.filter(
        (item) => item.user_name === user_id
      );

      const mappedCartItems = filteredCartData.map((cartItem) => {
        const product = productData.find(
          (p) => p.id === parseInt(cartItem.product_id)
        );
        return {
          ...cartItem,
          name: product ? product.title : "Unknown Product",
          price: product ? product.price : 0,
          image: product ? product.image : "",
        };
      });

      setCartItems(mappedCartItems);
    } catch (error) {
      console.error("Error fetching cart or product data", error);
    } finally {
      setIsLoading(false);
    }
  }, [user_id]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      const itemToUpdate = cartItems.find((item) => item._id === itemId);
      if (!itemToUpdate) return;

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === itemId ? { ...item, count: newQuantity } : item
        )
      );

      await axios.put("https://v1.appbackend.io/v1/rows/NlqSRdbvsXUZ", {
        _id: itemToUpdate._id,
        user_name: itemToUpdate.user_name,
        product_id: itemToUpdate.product_id,
        count: newQuantity,
      });

      console.log("Quantity updated on server successfully");
    } catch (error) {
      console.error("Error updating quantity on server:", error);
      await fetchCartItems();
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete("https://v1.appbackend.io/v1/rows/NlqSRdbvsXUZ", {
        data: [itemId],
      });

      console.log("Item deleted from server successfully");
      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== itemId)
      );
    } catch (error) {
      console.error("Error deleting item from server:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Keranjang Belanja</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-30">
          <Loader />
        </div>
      ) : cartItems.length === 0 ? (
        <div className="text-center text-gray-500">Keranjang kosong</div>
      ) : (
        cartItems.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            onUpdateQuantity={handleUpdateQuantity}
            onDelete={handleDelete}
          />
        ))
      )}

      {!isLoading && cartItems.length > 0 && (
        <div className="mt-6 font-bold text-right">
          Total Harga: ${" "}
          {cartItems
            .reduce((total, item) => total + item.price * item.count, 0)
            .toLocaleString()}
        </div>
      )}
    </div>
  );
}

export default CartList;
