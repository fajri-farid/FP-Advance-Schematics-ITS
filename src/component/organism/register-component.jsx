import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../atoms/input";
import Button from "../atoms/button";

export default function RegisterComponent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setErrorMessage("All fields are required!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post(
        "https://v1.appbackend.io/v1/rows/dKqJ7KQXYKek",
        [payload]
      );
      console.log(response.data);

      alert("Registration successful!");
      navigate("/login");
      setErrorMessage("");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to register. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-lg w-full p-6 sm:p-8 md:p-12 lg:p-16 md:border md:rounded-lg md:shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              name="name"
              placeholder="Username"
              size="large"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              size="large"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4 relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              size="large"
              value={formData.password}
              onChange={handleChange}
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

          <div className="mb-4 relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              size="large"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <span
              onClick={handleToggleConfirmPassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
            >
              <i
                className={`fas ${
                  showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </span>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center mb-4">
              {errorMessage}
            </p>
          )}

          <p className="text-center text-sm text-gray-600 mb-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>

          <Button label="Register" className="w-full" />
        </form>
      </div>
    </div>
  );
}
