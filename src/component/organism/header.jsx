import { Link } from "react-router-dom";
import Button from "../atoms/button";
import Input from "../atoms/input";
import { useState, useEffect } from "react";

function Header() {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <div className="bg-blue-500 w-full p-4 relative">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
        <div className="flex justify-between w-full sm:w-auto">
          <Link to="/" className="text-white text-xl font-bold">
            TokoOnline
          </Link>

          {!user ? (
            <Link to="/login">
              <Button
                label="login"
                className="sm:hidden border border-white text-white"
              />
            </Link>
          ) : (
            <div className="sm:hidden flex items-center gap-4">
              <Link to="/cart">
                <i className="fa-solid fa-cart-shopping text-white text-lg"></i>
              </Link>
              <Link to="/wishlist">
                <i className="fa-regular fa-heart text-white text-lg"></i>
              </Link>
              <span
                className="text-white font-bold cursor-pointer"
                onClick={toggleDropdown}
              >
                {user.name.slice(0, 5)}
              </span>
              <i
                className="fa-regular fa-user text-white text-lg cursor-pointer"
                onClick={toggleDropdown}
              ></i>
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

        {!user ? (
          <div className="hidden md:block">
            <Link to="/login">
              <Button
                label="login"
                className="border border-white text-white hover:bg-white hover:text-black"
              />
            </Link>
          </div>
        ) : (
          <div className="hidden sm:flex gap-4 relative">
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping text-white text-lg"></i>
            </Link>
            <Link to="/wishlist">
              <i className="fa-regular fa-heart text-white text-lg"></i>
            </Link>
            <span
              className="text-white font-bold cursor-pointer"
              onClick={toggleDropdown}
            >
              {user.name.slice(0, 5)}
            </span>
            <i
              className="fa-regular fa-user text-white text-lg cursor-pointer"
              onClick={toggleDropdown}
            ></i>
            {dropdownVisible && (
              <div className="absolute right-0 mt-10 w-48 bg-white rounded-lg shadow-lg">
                <div className="p-2">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
