const Post = (post: {
    _id: string;
    title: string;
    author: { email: string };
    content: string;
    createdAt: string;
}) => {
    return (
        <div
            key={post._id}
            className="bg-background-secondary p-6 rounded-lg shadow-lg"
        >
            <h2 className="text-2xl font-semibold text-accent hover:text-accent-hover">
                {post.title}
            </h2>
            <p className="text-text-secondary mt-2">{post.content}</p>
            <div className="mt-4 text-sm text-text-secondary">
                <p>Author: {post.author.email}</p>
                <p>
                    Posted on: {new Date(post.createdAt).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default Post;
