// pages/sustainability/[id].tsx
"use client";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

interface Blog {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  publishedDate: string;
  updatedDate: string;
  content: string;
}

export default function Blog() {
  const router = useRouter();
  const { id } = useParams();

  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        const response = await axios.get(
          `https://dummyapi.online/api/blogposts/${id}`
        );
        setBlog(response.data);
      };
      fetchBlog();
    }
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="min-h-screen py-10 bg-gray-50">
      <div className="container mx-auto px-4">
          <button className="mr-1 bg-red-600 text-white py-2 px-4 rounded mt-4"
            onClick={async () => {
              await axios.delete(`https://dummyapi.online/api/blogposts/${id}`);
              router.push('/sustainability');
            }}
        >
        Delete Blog
      </button>
      <button className="ml-1 bg-blue-600 text-white py-2 px-4 rounded mt-4"
            onClick={async () => {
              router.push(`/sustainability/${id}/edit-blog`);
            }}          
        >
        Edit Blog
      </button>

        <h1 className="text-4xl font-bold mb-4">{blog?.title}</h1>
        <img
          src={blog?.imageUrl}
          alt={blog?.title}
          className="w-full h-96 object-cover rounded mb-4"
        />
        <p className="text-gray-700">{blog.content}</p>
      </div>
    </div>
  );
}
