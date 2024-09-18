import { useState, useEffect } from "react";
import axios from "axios";
import BoxItem from "../molecule/box-item";
import Loader from "../atoms/loader";
import Filter from "../organism/filter"; // Import Filter

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // State untuk produk yang sudah difilter
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All"); // State untuk kategori yang dipilih

  // Mengambil data dari API menggunakan Axios
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setFilteredProducts(response.data); // Default tampilkan semua produk
      } catch (error) {
        console.error("Error fetching the products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Efek untuk mem-filter produk berdasarkan kategori yang dipilih
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(products); // Jika kategori "All" dipilih, tampilkan semua produk
    } else {
      const filtered = products.filter(
        (product) => product.category === selectedCategory.toLowerCase() // Filter berdasarkan kategori
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      {/* Komponen Filter */}
      <Filter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="grid grid-cols-6 gap-2 mx-6">
        {filteredProducts.map((product) => (
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
    </div>
  );
}
