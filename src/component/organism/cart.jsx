import { useState, useEffect, useCallback } from "react";
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
      const cartResponse = await fetch(
        "https://v1.appbackend.io/v1/rows/NlqSRdbvsXUZ"
      );
      const cartData = await cartResponse.json();

      const productResponse = await fetch("https://fakestoreapi.com/products");
      const productData = await productResponse.json();

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

      const response = await fetch(
        "https://v1.appbackend.io/v1/rows/NlqSRdbvsXUZ",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: itemToUpdate._id,
            user_name: itemToUpdate.user_name,
            product_id: itemToUpdate.product_id,
            count: newQuantity,
          }),
        }
      );

      if (response.ok) {
        console.log("Quantity updated on server successfully");
      } else {
        console.error("Failed to update quantity on server");
        await fetchCartItems();
      }
    } catch (error) {
      console.error("Error updating quantity on server:", error);
      await fetchCartItems();
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(
        "https://v1.appbackend.io/v1/rows/NlqSRdbvsXUZ",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([itemId]),
        }
      );

      if (response.ok) {
        console.log("Item deleted from server successfully");
        setCartItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemId)
        );
      } else {
        console.error(
          "Failed to delete item from server:",
          response.status,
          response.statusText
        );
      }
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
