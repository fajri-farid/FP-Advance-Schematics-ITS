import Input from "../atoms/input";
import Button from "../atoms/button";

export default function RegisterComponent() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-lg w-full p-6 sm:p-8 md:p-12 lg:p-16 md:border md:rounded-lg md:shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>

        {/* Input Username */}
        <div className="mb-4">
          <Input placeholder="Username" size="large" />
        </div>

        {/* Input Email */}
        <div className="mb-4">
          <Input type="email" placeholder="Email" size="large" />
        </div>

        {/* Input Password */}
        <div className="mb-4">
          <Input type="password" placeholder="Password" size="large" />
        </div>

        {/* Input Confirm Password */}
        <div className="mb-4">
          <Input type="password" placeholder="Confirm Password" size="large" />
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mb-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>

        {/* Register Button */}
        <Button label="Register" className="w-full" />
      </div>
    </div>
  );
}
