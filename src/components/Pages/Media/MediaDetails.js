import React from 'react';
import { useLoaderData } from 'react-router-dom';

const MediaDetails = () => {

    const { data: post } = useLoaderData();
    console.log(post);


    return (
        <div>
            This is media details
        </div>
    );
};

export default MediaDetails;