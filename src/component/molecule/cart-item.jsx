import Button from "../atoms/button";

function CartItem({ item, onUpdateQuantity, onDelete }) {
  const handleDecrease = () => {
    if (item.count > 1) {
      onUpdateQuantity(item._id, item.count - 1);
    }
  };

  const handleIncrease = () => {
    onUpdateQuantity(item._id, item.count + 1);
  };

  return (
    <div className="flex items-center gap-4 border-b p-4">
      {/* Gambar */}
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover"
      />
      {/* Nama dan Harga dalam satu kolom */}
      <div className="flex-1">
        <p className="font-bold">{item.name}</p>
        <p className="text-gray-600">$ {item.price.toLocaleString()}</p>
      </div>
      {/* Increase / Decrease */}
      <div className="flex items-center gap-2">
        <Button
          label="-"
          onClick={handleDecrease}
          className="bg-red-500"
          disabled={item.count <= 1}
        />
        <span>{item.count}</span>
        <Button label="+" onClick={handleIncrease} className="bg-green-500" />
      </div>
      {/* Harga total */}
      <div className="font-bold">
        $ {(item.price * item.count).toLocaleString()}
      </div>
      {/* Icon Delete */}
      <i
        className="fa fa-trash text-red-500 cursor-pointer"
        onClick={() => onDelete(item._id)}
      ></i>
    </div>
  );
}

export default CartItem;
