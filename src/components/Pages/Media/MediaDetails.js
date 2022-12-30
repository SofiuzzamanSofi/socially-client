import React, { useContext } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import noImgFound from "../../assets/noImgFound.png"
import { BiLike, BiComment, BiShare } from "react-icons/bi";
import { FaShare, FaRegShareSquare } from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';
import { toast } from 'react-hot-toast';


const MediaDetails = () => {

    const { data: post } = useLoaderData();
    // console.log(post);
    const { user } = useContext(AuthContext);
    // console.log(user)

    const handleAddcomment = (event) => {
        event.preventDefault();
        const commentText = event.target?.commentText?.value;
        const comment = {
            commenterDisplayName: user?.displayName,
            commenterEmail: user?.email,
            commenterPhotoURL: user?.photoURL,
            commentText: commentText,
        };
        console.log(comment);
        axios.put(`http://localhost:5000/post/${post?._id}`, comment)
            .then(data => {
                toast.success(`Dear ${user?.displayName}, your comment is added successfully.`);
            })
            .catch(error => console.log("error from comment add axios catch:", error));
    };



    return (
        <div>
            <div className='border min-w-[320px] grid gap-4 rounded-md dark:text-white bg-slate-50 dark:bg-slate-800 shadow-md'>

                <div className='p-4 grid gap-4'>
                    <div className='flex justify-between items-center'>
                        <p> post by:</p>
                        <p>{post?.postOwnerName}</p>
                        <PhotoProvider>
                            <PhotoView src={post?.postOwnerPhoto ? post?.postOwnerPhoto : noImgFound} >
                                <img src={post?.postOwnerPhoto ? post?.postOwnerPhoto : noImgFound} alt="" className='cursor-pointer w-10 md:w-16 rounded-full border border-[#046380]' title='click to full view' />
                            </PhotoView>
                        </PhotoProvider>
                    </div>
                    <h1>{post?.postTitle}</h1>
                    <PhotoProvider>
                        <PhotoView src={post?.postImage} >
                            <img src={post?.postImage ? post?.postImage : ""} alt="" className='cursor-pointer' title='click to full view' />
                        </PhotoView>
                    </PhotoProvider>
                    <p className='mb-20'>{post?.postDetails}</p>
                </div>



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

                <div className='p-4 grid gap-4'>
                    <div className='py-5'>
                        <form
                            onSubmit={handleAddcomment}
                        >
                            <input
                                type="text" placeholder='write your comments' name='commentText'
                                className='p-4 rounded-md border border-black w-full'
                            />
                        </form>
                    </div>
                    <div>
                        <div className='flex gap-4 items-center'>
                            <PhotoProvider>
                                <PhotoView src={post?.postOwnerPhoto ? post?.postOwnerPhoto : noImgFound} >
                                    <img src={post?.postOwnerPhoto ? post?.postOwnerPhoto : noImgFound} alt="" className='cursor-pointer w-10 md:w-16 rounded-full border border-[#046380]' title='click to full view' />
                                </PhotoView>
                            </PhotoProvider>
                            <div>
                                <p>{post?.postOwnerName}</p>
                                <p>post?.postOwnerName comments</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MediaDetails;