// components/BlogForm.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";

interface BlogFormProps {
  onSubmit: (
    title: string,
    author: string,
    content: string,
    imageFile: File | undefined
  ) => void;
  initialData?: {
    title: string;
    author: string;
    content: string;
    imageFile: File | undefined;
  };
}

const BlogForm: React.FC<BlogFormProps> = ({ onSubmit, initialData }) => {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [imageFile, setImageFile] = useState(initialData?.imageFile);
  const [imagePreview, setImagePreview] = useState<string | null>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, author, content, imageFile);
  };

  // Handle image upload and preview
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Optional: Upload file to a server and get its URL
      // For now, we'll set a dummy URL after "uploading"
      // setImageFile(URL.createObjectURL(file)); // Replace with actual URL from server if uploading
    }
  };

  return (
    <div className="min-h-screen container">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 border border-gray-300 rounded-md max-w-xlg mx-auto"
      >
        {/* Back Button */}
        <button
          type="button"
          onClick={() => router.back()}
          className="text-green-600 hover:underline mb-4 inline-flex items-center"
        >
          ← Back
        </button>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          style={{ minHeight: "200px" }} // Minimum height for fixed size
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {imagePreview && (
          <div className="mt-4">
            <p className="text-gray-600 mb-2">Image Preview:</p>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-64 object-cover rounded"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
