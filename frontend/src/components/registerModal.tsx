// components/RegisterModal.js
import { useState } from 'react';

export default function RegisterModal({ isOpen, onClose }: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-4 text-green-600 hover:underline text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}
