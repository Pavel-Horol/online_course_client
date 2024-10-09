import CreatePostForm from "@/components/PostForm";
import PostService from "@/services/PostService";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false)
  const [render, setRender] = useState<boolean>(false)
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await PostService.getAll()
        console.log(response);
        if(response.status !== 200) { throw new Error('Network response was not ok') } 
        setPosts(response.data)
      }catch(erorr){
        setError(error)        
      }finally{
        setLoading(false)
      }
    }
    fetchData()
  }, [render]);
  
  const handlePostCreated = async (newPost: any) => {
    try{
      await PostService.create(newPost)
      setRender(prev => !prev)
    }catch(error){
      throw new Error('error while creating post', error)
    }finally{
      setIsFormVisible(false)
    }

  }
  
  const toggleFormVisibility = () => {
    setIsFormVisible(prev => !prev)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (

    <div className="bg-background p-4 text-text font-fira">
      <h1 className="text-4xl font-bold mb-6 text-accent">Posts</h1>
      <div className="w-full mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {posts && posts.map((post) => (
          <div key={post._id} className="bg-background-secondary p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-accent hover:text-accent-hover">
              {post.title}
            </h2>
            <p className="text-text-secondary mt-2">{post.content}</p>
            <div className="mt-4 text-sm text-text-secondary">
              <p>Author: {post.author.email}</p>
              <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
        <motion.div
         whileHover={{scale: 1.1}}
         whileTap={{scale: 0.95}}
         className="relative bg-background-secondary border border-dashed rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300 flex items-center justify-center"
        onClick={toggleFormVisibility}
        >
          <svg
                className="w-16 h-16 text-accent group-hover:text-accent-hover transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 5v14m7-7H5"
                />
            </svg>
        </motion.div>
      </div>
      {isFormVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-background-secondary p-8 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-4 right-4 text-gray-200 hover:text-gray-900"
              onClick={toggleFormVisibility}
            >
              x {/* Close button */}
            </button>
            <CreatePostForm onPostCreated={handlePostCreated} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
