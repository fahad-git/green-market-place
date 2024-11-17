"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/src/handlers/redux/hooks";
import { toast } from "react-toastify";
import { updateCartItemQuantity, removeCartItem, fetchCartItems } from "@/src/handlers/redux/slices/cartSlice";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const cart = useAppSelector((state: any) => state.carts.cart);
  const user = useAppSelector((state: any) => state.auth.user);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    dispatch(fetchCartItems(user?.id)).then((action) => {
      if (!fetchCartItems.fulfilled.match(action)) {
        // returns cart
        toast.error("Failed to load blogs.");
      }
    });
  }, []);

  if (!mounted || !user || !cart) return <div className="min-h-screen"></div>;

  // Calculate the total price of items in the cart
  const totalPrice = cart.items?.reduce((total: number, item: any) => total + item.price * item.quantity, 0);

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      // If quantity goes below 1, remove the item
      dispatch(removeCartItem({userId: user.id, productId: productId}));
      toast.info("Item removed from cart.");
    } else {
      dispatch(updateCartItemQuantity({ userId: user?.id, productId: productId, quantity }));
      toast.success("Cart updated.");
    }
  };

  const handleRemoveItem = (productId: number) => {
    dispatch(removeCartItem({userId: user.id, productId: productId}));
    toast.info("Item removed from cart.");
  };

  const handleProceedToCheckout = () => {
    if (cart.items?.length === 0) {
      toast.error("Your cart is empty. Add some items before proceeding.");
      return;
    }
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>

      {cart.totalQuantity === 0 ? (
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">Your cart is empty. Add some sustainable items!</p>
          <Link href="/">
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded">
              Shop Now
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cart.items?.map((item: any) => (
              <div
                key={item.productId}
                className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-4"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.thumbnail || "/images/default-product.jpg"}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                    <p className="text-sm text-emerald-600 font-bold">€{item.price?.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    className="bg-gray-200 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-300"
                    onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button
                    className="bg-gray-200 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-300"
                    onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className="text-red-500 font-semibold hover:underline"
                    onClick={() => handleRemoveItem(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700">Subtotal:</span>
              <span className="text-lg font-bold">€{totalPrice?.toFixed(2)}</span>
            </div>
            <div className="text-sm text-gray-500 mb-6">
              Taxes and shipping calculated at checkout.
            </div>
            <button
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 w-full rounded"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
