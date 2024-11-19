import { toast } from "react-toastify";

export default function ProductInfo({ product }: { product: any }) {
    const handleAddToCart = () => {
      if (product?.stock >= 1) {
        toast.success("Added to cart!");
      } else {
        toast.error("Not enough stock available.");
      }
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
            €{(product.price  - (product.price * (product.discountPercentage/100)))?.toFixed(2)}
          </span>
          {product.discountPercentage > 0 && (
            <span className="mr-3 text-2xl font-semibold text-green-600 animate-blink ">
              {
                `${product.discountPercentage.toFixed(2)} off`
              }
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
  
        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            className="btn-primary flex-1 py-3 px-6 rounded-lg font-semibold"
            onClick={handleAddToCart}
            disabled={product.stock < 1}
          >
            Add to Cart
          </button>
          <button className="btn-secondary flex-1 py-3 px-6 rounded-lg font-semibold">
            Buy Now
          </button>
        </div>
      </div>
    );
  }
  