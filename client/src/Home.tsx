import React from 'react';
import { trpc } from './App';

const Home = () => {
    const mutation = trpc.post.createPost.useMutation();
    const greeting = trpc.greeting.useQuery({ name: 'Dung' });
    const posts = trpc.post.listPosts.useQuery();
    console.log(greeting);
    console.log(posts);
    const handleAddPost = () => {
        const title = 'This is a new post';
        mutation.mutate({ title });
    };
    return (
        <div>
            <h1>Hi</h1>
            <button onClick={handleAddPost}>Add post</button>
        </div>
    );
};

export default Home;
