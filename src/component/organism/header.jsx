import { Link } from "react-router-dom";
import Button from "../atoms/button";
import Input from "../atoms/input";

function Header() {
  return (
    <div className="bg-green-400 w-full p-4">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-black text-xl font-bold">
          TokoOnline
        </Link>
        <div className="relative flex-grow">
          <Input
            type="search"
            placeholder="Search..."
            size="small"
            className="pr-10"
          />
          <i className="fa-solid fa-magnifying-glass absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
        <Button label="login" />
      </div>
    </div>
  );
}

export default Header;
