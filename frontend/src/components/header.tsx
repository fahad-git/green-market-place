// components/Header.js
"use client"
import Link from 'next/link';
import { useState } from 'react';
import "../styles/header.css";
import Image from 'next/image';
import SignInModal from './signinModal';
import RegisterModal from './registerModal';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  const handleSearch = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(`Searching for: ${searchTerm}`);
    setSearchTerm('');
  };

  return (
    <header className="bg-green-600 shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
            <Image 
              src="/images/gmp-white.png"
              alt="GMP"
              width={150}
              height={50}
              priority // This will make the image load faster as a priority asset
            />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/shop" className="hover:text-gray-800 text-white">Shop</Link>
          <Link href="/about" className="hover:text-gray-800 text-white">About</Link>
          <Link href="/contact" className="hover:text-gray-800 text-white">Contact</Link>
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="px-3 py-1 outline-none"
          />
          <button type="submit" className="bg-white-600 hover:bg-green-700 text-white px-3 py-1">
            Search
          </button>
        </form>

        {/* User and Cart Icons */}
        <div className="flex space-x-4">
          {/* <Link href="/login" className="hover:text-blue-600">
            Sign In
          </Link>
          <Link href="/register" className="hover:text-blue-600">
            Register
          </Link> */}
          <div className="flex space-x-4">
          <button onClick={() => setSignInOpen(true)} className="hover:text-gray-800 text-white">
            Sign In
          </button>
          <button onClick={() => setRegisterOpen(true)} className="hover:text-gray-800 text-white">
            Register
          </button>
        </div>
          <Link href="/cart" className="hover:text-gray-800 text-white">
            Cart
          </Link>
        </div>
      </div>
      {/* Modals */}
      <SignInModal isOpen={isSignInOpen} onClose={() => setSignInOpen(false)} />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setRegisterOpen(false)} />
    </header>
  );
}
