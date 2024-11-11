"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { logout } from '../handlers/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SignInModal from './signinModal';
import RegisterModal from './registerModal';
import "../styles/header.css";
import { useAppDispatch, useAppSelector } from '../handlers/redux/hooks';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // Track if component has mounted

  const user = useAppSelector((state: any) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Set mounted to true after client-side render
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
      setDropdownOpen(false);
    }
  }, [user]);

  const handleSearch = (e: any) => {
    e.preventDefault();
    console.log(`Searching for: ${searchTerm}`);
    setSearchTerm('');
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/'); // Redirect to the home page after logout
  };

  if (!mounted) return null; // Avoid rendering mismatched HTML on the server

  return (
    <header className="bg-green-600 shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          <Image 
            src={"/images/gmp-white.png"}
            alt="GMP"
            width={150}
            height={50}
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/sustainability" className="hover:text-gray-800 text-white">Sustainability</Link>
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
          <button type="submit" className="bg-green-700 text-white px-3 py-1">
            Search
          </button>
        </form>

        {/* User and Cart Icons */}
        <div className="flex space-x-4 items-center">
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!isDropdownOpen)} 
                className="flex items-center space-x-2 text-white focus:outline-none"
              >
                <span className="flex items-center space-x-2">
                  <Image
                    src={user?.avatar?.avatarUrl || "/images/default-avatar.png"}
                    alt={`${user.name}'s avatar`}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span className="hover:text-gray-200">{`Hello, ${user.name}`}</span>
                </span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                  <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link href="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-4">
              <button onClick={() => setSignInOpen(true)} className="hover:text-gray-200 text-white">
                Sign In
              </button>
              <button onClick={() => setRegisterOpen(true)} className="hover:text-gray-200 text-white">
                Register
              </button>
            </div>
          )}
          <Link href="/cart" className="hover:text-gray-200 text-white">            
            <Image
              src="/images/cart.png"
              alt="Cart"
              width={40}
              height={40}
            />
          </Link>
        </div>
      </div>
      {/* Modals */}
      <SignInModal isOpen={isSignInOpen} onClose={() => setSignInOpen(false)} />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setRegisterOpen(false)} />
    </header>
  );
}
