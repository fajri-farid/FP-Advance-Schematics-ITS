import { useState } from "react";
import AllProducts from "../organism/all-products";
import Header from "../organism/header";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="flex gap-2 flex-col">
      <Header onSearch={handleSearch} />
      <AllProducts searchTerm={searchTerm} />
    </div>
  );
}
