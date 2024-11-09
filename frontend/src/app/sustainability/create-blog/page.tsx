// pages/sustainability/createBlog.tsx
"use client"
import BlogForm from '@/src/components/blogForm';
import { useRouter } from 'next/navigation';

export default function CreateBlog() {
  const router = useRouter();

  const handleSubmit = async (title: string, author: string, content: string, imageFile: File | undefined) => {
    // router.push('/sustainability');
  };

  return (
    <div className="min-h-screen container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Create New Blog</h1>
      <BlogForm onSubmit={handleSubmit} />
    </div>
  );
};
