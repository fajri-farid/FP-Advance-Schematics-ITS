function Button({ label = "Click Me", onClick, className = "" }) {
  return (
    <button
      className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600  ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
