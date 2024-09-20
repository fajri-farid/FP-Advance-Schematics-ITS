import { Link } from "react-router-dom";
import Button from "../atoms/button";
import Input from "../atoms/input";
import { useState, useEffect } from "react";

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Cek session storage untuk informasi user
    const loggedInUser = sessionStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // Simpan user ke state
    }
  }, []);

  return (
    <div className="bg-green-400 w-full p-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
        <div className="flex justify-between w-full sm:w-auto">
          <Link to="/" className="text-black text-xl font-bold">
            TokoOnline
          </Link>

          {/* Jika user tidak login, tampilkan tombol login */}
          {!user ? (
            <Button label="login" className="md:hidden" />
          ) : (
            <div className="md:hidden flex items-center gap-4">
              {/* Icon keranjang */}
              <i className="fa-solid fa-cart-shopping text-black text-lg"></i>
              {/* Icon love */}
              <i className="fa-regular fa-heart text-black text-lg"></i>
              {/* Username (5 huruf) */}
              <span className="text-black font-bold">
                {user.name.slice(0, 5)}
              </span>
              {/* Icon profile */}
              <i className="fa-regular fa-user text-black text-lg"></i>
            </div>
          )}
        </div>

        <div className="relative flex-grow">
          <Input
            type="search"
            placeholder="Search..."
            size="small"
            className="pr-10"
          />
          <i className="fa-solid fa-magnifying-glass absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>

        {/* Elemen pada layar lebih besar (md ke atas) */}
        {!user ? (
          <div className="hidden md:block">
            <Button label="login" />
          </div>
        ) : (
          <div className="hidden md:flex gap-4">
            {/* Icon keranjang */}
            <i className="fa-solid fa-cart-shopping text-black text-lg"></i>
            {/* Icon love */}
            <i className="fa-regular fa-heart text-black text-lg"></i>
            {/* Username (5 huruf) */}
            <span className="text-black font-bold">
              {user.name.slice(0, 5)}
            </span>
            {/* Icon profile */}
            <i className="fa-regular fa-user text-black text-lg"></i>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
