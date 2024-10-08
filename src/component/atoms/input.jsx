function Input({
  type = "text",
  placeholder = "Enter text...",
  size = "medium",
  name,
  value,
  onChange,
}) {
  const getSize = () => {
    switch (size) {
      case "small":
        return "p-2 text-sm";
      case "large":
        return "p-4 text-lg";
      default:
        return "p-3 text-base";
    }
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 w-full ${getSize()}`}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
