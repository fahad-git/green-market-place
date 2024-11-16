"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/src/handlers/redux/hooks";
import { getProduct } from "@/src/handlers/redux/slices/productSlice";

// Import PNG images for filled and empty stars
import starFilled from "@/public/images/star-fill.png";
import starEmpty from "@/public/images/star-empty.png";
import productDefault from "@/public/images/product-default.png"

// Default placeholder image
const defaultPlaceholder = "/images/default-placeholder.png";

export default function ProductPage({ params }: { params: { id: string } }) {
  const [mounted, setMounted] = useState(false);
  const [imageState, setImageState] = useState("default"); // "default" | "thumbnail" | "highRes"
  const dispatch = useAppDispatch();
  const router = useRouter();

  const product = useAppSelector(
    (state: any) => state.products.selectedProduct
  );

  useEffect(() => {
    setMounted(true);
    const { id } = params;
    dispatch(getProduct(id)).then((action) => {
      if (!getProduct.fulfilled.match(action)) {
        toast.error("Failed to load product.");
      }
      // Reset image state for new product
      setImageState("default");
    });
  }, [params]);

  const handleBackButton = () => {
    router.push("/products");
  };

  const handleAddToCart = () => {
    if (product?.stock >= 1) {
      toast.success("Added to cart!");
    } else {
      toast.error("Not enough stock available.");
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Image
          key={i}
          src={i < rating ? starFilled : starEmpty}
          alt="star"
          width={20}
          height={20}
          className="mr-1"
        />
      );
    }
    return stars;
  };

  if (!mounted || !product) return <div className="min-h-screen"></div>;

  const handleThumbnailLoad = () => {
    setImageState("thumbnail");
  };

  const handleHighResLoad = () => {
    setImageState("highRes");
  };

  const getCurrentImage = () => {
    switch (imageState) {
      case "highRes":
        return product.images[0];
      case "thumbnail":
        return product.thumbnail;
      default:
        return productDefault;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <button
        onClick={() => router.push("/")}
        className="p-2 bg-gray-200 my-5 mx-5 rounded-full hover:bg-green-100 transition duration-150"
        title="Back"
      >
        <Image src="/images/back-arrow.png" alt="BACK" width={24} height={24} />
      </button>

      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Product Image */}
          <div className="relative flex justify-center">
            {/* Placeholder > Thumbnail > High-Resolution */}
            <Image
              src={getCurrentImage()}
              alt={product.title}
              width={500}
              height={500}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
              priority
              onLoad={imageState === "default" ? handleThumbnailLoad : handleHighResLoad}
            />
          </div>

          {/* Right - Product Info */}
          <div className="flex flex-col justify-between space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price?.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-green-600 font-semibold">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>
            <p
              className={`text-sm font-semibold ${
                product.stock > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </p>
            <div className="flex gap-6 mt-6">
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
        </div>
      </div>

      <div className="bg-white py-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-6">Product Description</h2>
          <p className="text-lg text-gray-700">{product.description}</p>
        </div>
      </div>

      <div className="bg-gray-100 py-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6">
            Reviews ({product.reviews?.length || 0})
          </h2>
          <div className="space-y-6">
            {product.reviews?.map((review: any, index: any) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">
                    {review.reviewerName}
                  </h3>
                  <div className="flex items-center">{renderStars(review.rating)}</div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
                <small className="text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
