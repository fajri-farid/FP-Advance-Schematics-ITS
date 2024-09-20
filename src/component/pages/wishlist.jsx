import Header from "../organism/header";
import WishlistOrganism from "../organism/wislist-organism";

export default function Wishlist() {
  return (
    <div className="flex gap-2 flex-col">
      <Header />
      <WishlistOrganism />
    </div>
  );
}
