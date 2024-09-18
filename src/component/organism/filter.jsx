export default function Filter({ selectedCategory, setSelectedCategory }) {
  const categories = [
    "All",
    "Women's Clothing",
    "Men's Clothing",
    "Jewelery",
    "Electronics",
  ];

  return (
    <div className="flex justify-center gap-4 p-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 rounded-full border-2 ${
            selectedCategory === category
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-gray-700 border-gray-300"
          } transition-colors duration-200 ease-in-out`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
