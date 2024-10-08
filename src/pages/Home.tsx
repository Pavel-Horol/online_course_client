const Home = () => {
  const posts = [
    {
      _id: 1,
      title: "First Post",
      content: "This is the content of the first post.",
      author: { email: "test1@gmail.com" },
      createdAt: new Date(),
    },
    {
      _id: 2,
      title: "Second Post",
      content: "This is the content of the second post.",
      author: { email: "test2@gmail.com" },
      createdAt: new Date(),
    },
    {
      _id: 3,
      title: "Third Post",
      content: "This is the content of the third post.",
      author: { email: "test3@gmail.com" },
      createdAt: new Date(),
    },
  ];

  return (
    <div className="bg-background p-4 text-text font-fira">
      <h1 className="text-4xl font-bold mb-6 text-accent">Posts</h1>
      <div className="w-full mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {posts.map((post) => (
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
      </div>
    </div>
  );
};

export default Home;
