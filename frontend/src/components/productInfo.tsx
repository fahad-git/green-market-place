import { useState } from "react";
import { toast } from "react-toastify";

export default function ProductInfo({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (product?.stock >= quantity && quantity > 0) {
      toast.success(`${quantity} item(s) added to cart!`);
    } else {
      toast.error("Not enough stock available.");
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) setQuantity(value);
    else setQuantity(1); // Default to 1 if invalid input
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>

      {/* Price */}
      <div className="space-y-2">
        <div className="text-xl font-bold text-gray-900 mb-3">
          <s>€{product.price?.toFixed(2)}</s>
        </div>
        <span className="text-3xl font-bold text-gray-900 mr-2">
          €
          {(
            product.price -
            product.price * (product.discountPercentage / 100)
          )?.toFixed(2)}
        </span>
        {product.discountPercentage > 0 && (
          <span className="mr-3 text-2xl font-semibold text-green-600 animate-blink">
            {`${product.discountPercentage.toFixed(2)}% off`}
          </span>
        )}
      </div>

      {/* Stock Status */}
      <p
        className={`text-sm font-semibold ${
          product.stock > 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
      </p>

      {/* Tags */}
      <div className="flex gap-2">
        {product.tags?.map((tag: string, i: number) => (
          <span
            key={i}
            className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Quantity Input */}
      <div className="mt-4 flex items-center gap-4">
        <label htmlFor="quantity" className="text-lg font-medium text-gray-700">
          Quantity:
        </label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          min={1}
          max={product.stock}
          onChange={handleQuantityChange}
          className="w-16 px-3 py-2 border border-gray-300 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white ${
            product.stock < 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 transition-all"
          }`}
          onClick={handleAddToCart}
          disabled={product.stock < 1}
        >
          Add to Cart
        </button>
        <button className="flex-1 py-3 px-6 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-all">
          Buy Now
        </button>
      </div>
    </div>
  );
}
