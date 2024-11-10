// pages/sustainability/index.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IBlog } from "@/src/handlers/interfaces/blogs";

export default function Sustainability() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const router = useRouter();

  // Placeholder for the current user's ID, assuming you get this from state/auth context
  const currentUserId = "current-user-id"; 

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get("https://dummyapi.online/api/blogposts");
      setBlogs(response.data);
    };
    fetchBlogs();
  }, []);

  const handleCreateButton = () => {
    router.push("/sustainability/create-blog");
  };

  const handleEdit = (blogId: string) => {
    router.push(`/sustainability/edit-blog/${blogId}`);
  };

  const handleDelete = async (blogId: string) => {
    // Example API delete call (assuming backend endpoint exists)
    await axios.delete(`https://dummyapi.online/api/blogposts/${blogId}`);
    setBlogs(blogs.filter(blog => blog.id !== blogId));
  };

  return (
    <div className="min-h-screen container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Sustainability Blogs</h1>
        <button
          className="relative inline-flex items-center justify-center overflow-hidden font-bold text-white bg-gradient-to-r from-green-500 to-green-700 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:from-green-600 hover:to-green-800 px-8 py-3"
          onClick={handleCreateButton}
        >
          <span className="absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out transform bg-white opacity-10 scale-0 hover:scale-100"></span>
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Create Blog
        </button>
      </div>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="relative rounded shadow-lg p-4 bg-white hover:shadow-xl transition duration-300 transform hover:scale-105"
          >
            <Image
              src={blog.imageUrl || `http://localhost:8000/api/file/1731198799040.jpeg`}
              alt={blog.title}
              width={100}
              height={100}
              className="w-full h-50 object-cover rounded mb-4"
              priority
            />
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>
            <Link
              href={`/sustainability/${blog.id}`}
              className="text-green-500 hover:underline"
            >
              Read More
            </Link>

            {/* Edit/Delete Buttons for User's Own Blogs */}
            {true && (
              <div className="absolute top-4 right-4 space-x-2 flex">
                <button
                  onClick={() => handleEdit(blog.id)}
                  className="bg-blue-400 hover:bg-yellow-500 text-white rounded-full p-2"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
                >
                  🗑️
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
