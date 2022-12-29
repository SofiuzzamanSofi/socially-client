import React from 'react';
import AddPost from '../AddPost/AddPost';
import Posts from '../Posts/Posts';

const Home = () => {
    return (
        <div>
            <AddPost />
            <Posts />
        </div>
    );
};

export default Home;