function Button({ label = "Click Me", className = "" }) {
  return (
    <button
      className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ${className}`}
    >
      {label}
    </button>
  );
}

export default Button;
