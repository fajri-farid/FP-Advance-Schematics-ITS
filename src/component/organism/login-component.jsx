import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../atoms/input";
import Button from "../atoms/button";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Email and password are required!");
      return;
    }

    try {
      const response = await axios.get(
        "https://v1.appbackend.io/v1/rows/dKqJ7KQXYKek"
      );
      const result = response.data;
      console.log(result);

      if (result.data && Array.isArray(result.data)) {
        const user = result.data.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          sessionStorage.setItem("user", JSON.stringify(user));

          alert("Login successful!");
          navigate("/");
        } else {
          setErrorMessage("Invalid email or password!");
        }
      } else {
        setErrorMessage("Unexpected response format.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-lg w-full p-6 sm:p-8 md:p-12 lg:p-16 md:border md:rounded-lg md:shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleLogin}>
          {/* Input Email */}
          <div className="mb-4">
            <Input
              type="email"
              placeholder="Email"
              size="large"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Input Password */}
          <div className="mb-4 relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              size="large"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={handleTogglePassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
            >
              <i
                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              ></i>
            </span>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center mb-4">
              {errorMessage}
            </p>
          )}

          <p className="text-center text-sm text-gray-600 mb-4">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>

          <Button label="Login" className="w-full" />
        </form>
      </div>
    </div>
  );
}
