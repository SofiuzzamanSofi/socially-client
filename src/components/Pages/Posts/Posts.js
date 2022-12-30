import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../LoadingPage/LoadingSpinner';
import MediaCard from '../Media/MediaCard';
import ButtonPublic from '../SharedPages/ButtonPublic/ButtonPublic';



const Posts = () => {


    // get post from database----
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["post"],
        queryFn: async () => {
            const res = await fetch("https://socially-server-sofiuzzamansofi.vercel.app/posts");
            const data = await res.json();
            if (data?.success) {
                return data?.data;
            } else { return data.success }
        }
    });

    // console.log("dddddddddddddddddddddddddd", data);
    if (isLoading) {
        return <LoadingSpinner />
    }


    return (
        <div className='py-5'>
            <div className='text-center'>
                <h1 className='sm:text-lg md:text-2xl'>Some most popular post</h1>

            </div>
            <div className='py-5 grid gap-5 md:grid-cols-2'>
                {data?.length && data?.map((post, index) => <MediaCard key={index} post={post} refetch={refetch} />)}

            </div>
            <div className='text-center py-5'>
                <Link to="/media" className='py-2 px-4 md:px-9 rounded-md border-[3px] border-[#046380] hover:bg-[#046380] hover:text-white'>Show all media</Link>
            </div>
        </div>
    );
};


export default Posts;