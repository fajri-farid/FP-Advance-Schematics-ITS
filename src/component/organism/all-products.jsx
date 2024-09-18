import { useState, useEffect } from "react";
import axios from "axios";
import BoxItem from "../molecule/box-item";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mengambil data dari API menggunakan Axios
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching the products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-6 gap-2 mx-6">
      {products.map((product) => (
        <BoxItem
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          image={product.image}
          rating={product.rating}
        />
      ))}
    </div>
  );
}
