// pages/shop.js
"use client"

import { toast } from "react-toastify";

export default function Shop() {

    const handleButton = () => {
        toast.success("Test")
    }

    return (
      <div className="min-h-screen py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-semibold text-center mb-6">Shop Us</h1>
          
          <div className="text-lg text-gray-700 leading-relaxed">
            <button onClick={handleButton}>Click Me!</button>
          </div>
        </div>
      </div>
    );
  }
  