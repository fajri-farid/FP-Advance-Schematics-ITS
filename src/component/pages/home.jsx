import AllProducts from "../organism/all-products";
import Header from "../organism/header";

export default function Home() {
  return (
    <div className="flex gap-4 flex-col">
      <Header />
      <AllProducts />
    </div>
  );
}
