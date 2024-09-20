import CartList from "../organism/cart";
import Header from "../organism/header";

export default function Cart() {
  return (
    <div className="flex gap-2 flex-col">
      <Header />
      <CartList />
    </div>
  );
}
