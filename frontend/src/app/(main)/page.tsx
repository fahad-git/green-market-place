// pages/products/index.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/src/handlers/redux/hooks";
// import { getProducts } from "@/src/handlers/redux/slices/productSlice";
// import { IProduct } from "@/src/handlers/interfaces/products";
import { toast } from "react-toastify";
import axios from "axios";
import { getProducts } from "@/src/handlers/redux/slices/productSlice";

export default function Products() {
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { products, loading, error } = useAppSelector((state: any) => state.products);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    setMounted(true);
    dispatch(getProducts()).then((action) => {
      if (!getProducts.fulfilled.match(action)) {
        toast.error("Failed to load products.");
      }
    });
  }, [dispatch]);

  
  const filteredProducts = products.filter((product: any) =>
    product.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!mounted || !products) return <div className="min-h-screen"></div>;

  return (
    <div className="min-h-screen container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Product Listing</h1>
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center">
          <p>Loading products...</p>
        </div>
      ) : error ? (
        <div className="text-center">
          <p className="text-red-500">Failed to load products. Try again later.</p>
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts?.map((product: any) => (
            <div
              key={product.id}
              className="relative rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition duration-300 transform hover:scale-105"
            >
              <Link href={`/products/${product.id}`}>
                <Image
                  src={product.thumbnail || `/images/default-product.jpg`}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded mb-4"
                  priority
                />
              </Link>
              <h2 className="text-lg font-semibold mb-2">
                <Link href={`/products/${product.id}`} className="hover:text-blue-500">
                  {product.title}
                </Link>
              </h2>
              <p className="text-gray-700 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">€{product.price.toFixed(2)}</span>
                <button
                  className="btn-primary"
                  onClick={() => router.push(`/products/${product.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
