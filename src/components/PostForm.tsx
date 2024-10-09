import {useState } from "react";

interface CreatePostFormProps {
  onPostCreated: (newPost: {title: string; content: string}) => void;
}

const CreatePostForm = ({ onPostCreated }: CreatePostFormProps) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onPostCreated({title, content})
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium ">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full p-2 border text-background-secondary border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full p-2 border text-background-secondary border-gray-300 rounded-md"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-accent text-white py-2 px-4 rounded hover:bg-accent-hover transition"
      >
        Create Post
      </button>
    </form>
  );
};

export default CreatePostForm;
