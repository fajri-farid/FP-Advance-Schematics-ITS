import { Link } from "react-router-dom";
import Button from "../atoms/button";
import Input from "../atoms/input";

function Header() {
  return (
    <div className="bg-green-400 w-full p-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
        <div className="flex justify-between w-full sm:w-auto">
          <Link to="/" className="text-black text-xl font-bold">
            TokoOnline
          </Link>
          {/* Ini akan disembunyikan pada layar 'md' dan lebih besar */}
          <Button label="login" className="md:hidden" />
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
        {/* Ini akan tampil di layar 'md' dan lebih besar */}
        <div className="hidden md:block">
          <Button label="login" />
        </div>
      </div>
    </div>
  );
}

export default Header;
