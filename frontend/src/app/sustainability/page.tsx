// pages/sustainability/index.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Blog {
  id: string;
  title: string;
  author: string;
  imageFile: File;
  imageUrl: string
  publishedDate: string;
  updatedDate: string;
  content: string;
}

export default function Sustainability() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch blogs from API
    const fetchBlogs = async () => {
      const response = await axios.get("https://dummyapi.online/api/blogposts");
      setBlogs(response.data);
    };
    fetchBlogs();
  }, []);

  const handleCreateButton = () => {
    router.push("/sustainability/create-blog");
  }

  return (
    <div className="min-h-screen container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Sustainability Blogs</h1>
        <button className="bg-blue-600 text-white py-2 px-4 rounded my-4" onClick={handleCreateButton}>
          Create Blog
        </button>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
        {blogs.map((blog) => (
          <div key={blog.id} className="rounded shadow-lg p-4">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-4">{blog.content}</p>
            <Link
              href={`/sustainability/${blog.id}`}
              className="text-green-500 hover:underline"
              passHref
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
