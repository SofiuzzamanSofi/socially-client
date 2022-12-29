import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import noImgFound from "../../assets/noImgFound.png"
import { BiLike, BiComment, BiShare } from "react-icons/bi";
import { FaShare, FaRegShareSquare } from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router-dom';


const MediaDetails = () => {

    const { data: post } = useLoaderData();
    console.log(post);


    return (
        <div>
            <div className='border min-w-[320px] p-4 grid gap-4 rounded-md dark:text-white bg-slate-50 dark:bg-slate-800 shadow-md'>

                <div className='flex justify-between items-center'>
                    <p> post by:</p>
                    <p>{post?.postOwnerName}</p>
                    <img
                        className='w-10 md:w-16 rounded-full border border-[#046380]'
                        src={post?.postOwnerPhoto ? post?.postOwnerPhoto : noImgFound} alt=""
                    />
                </div>
                <h1>{post?.postTitle}</h1>
                <PhotoProvider>
                    <PhotoView src={post?.postImage} >
                        <img src={post?.postImage ? post?.postImage : ""} alt="" className='cursor-pointer' title='click to full view' />
                    </PhotoView>
                </PhotoProvider>
                <p className='mb-20'>{post?.postDetails}</p>



                {/* like commnet section -- */}
                {/* <div className='p-5 border-y-[1px] flex justify-between items-center h-16 absolute bottom-5 left-0 right-0 mt-96'> */}
                <div className='p-5 border-y-[1px] flex justify-between items-center h-16'>
                    <BiLike className='h-8 w-8 hover:text-[#046380] cursor-pointer' />
                    <BiComment className='h-8 w-8 hover:text-[#046380] cursor-pointer' />
                    <BiShare className='h-8 w-8 rotate-180 hover:text-[#046380] cursor-pointer' />
                    <Link
                        to="/media"
                        className='border border-[#046380] hover:text-white hover:bg-[#046380] rounded-md px-2 py-1'
                    >
                        All Post
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default MediaDetails;