import { useQuery } from '@tanstack/react-query';
import React from 'react';
import MediaCard from './MediaCard';


const Media = () => {


    // get post from database----
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["post"],
        queryFn: async () => {
            const res = await fetch("https://socially-server-sofiuzzamansofi.vercel.app/post");
            const data = await res.json();
            if (data?.success) {
                return data?.data;
            } else { return data.success }
        }
    });

    // console.log(data);



    return (
        <div className='py-5'>
            <div className='text-center'>
                <h1 className='sm:text-lg md:text-2xl'>Show share from you or your friends posts.</h1>
                <p className='text-xs md:text-sm'>Feel free to like and share and comment.</p>
            </div>
            <div className='py-5 grid gap-5 md:grid-cols-2'>
                {data && data?.map((post, index) => <MediaCard key={index} post={post} refetch={refetch} />)}

            </div>
        </div>
    );
};

export default Media;