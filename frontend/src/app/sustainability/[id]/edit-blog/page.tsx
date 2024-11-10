// pages/sustainability/edit/[id].tsx
"use client"
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BlogForm from '@/src/components/blogForm';

export default function EditBlog() {

  const router = useRouter();
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        const response = await axios.get(`https://dummyapi.online/api/blogposts/${id}`);
        setInitialData(response.data);
      };
      fetchBlog();
    }
  }, [id]);

  const handleSubmit = async (title: string, content: string, imageFile: File | {}) => {
    // await axios.put(`/api/blogs/${id}`, { title, content, imageUrl });
    router.push('/sustainability');
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Edit Blog</h1>
      {initialData && <BlogForm onSubmit={handleSubmit} initialData={initialData} />}
    </div>
  );
};
