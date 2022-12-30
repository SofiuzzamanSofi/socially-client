import React, { useContext, useEffect, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import noImgFound from "../../assets/noImgFound.png"
import { BiLike, BiComment, BiShare } from "react-icons/bi";
import { FaShare, FaRegShareSquare } from 'react-icons/fa';
import { Link, useLoaderData, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';


const MediaDetails = () => {

    const [post, setPost] = useState();
    const [likeCommentRender, setLikeCommentRender] = useState(false);
    // const { data: post } = useLoaderData();
    // console.log("postttts", post?.comments);
    // console.log("postttts", post?.comments[2]?.commentText);
    const { user } = useContext(AuthContext);
    // console.log(user)




    const location = useLocation();
    // console.log(location?.pathname)
    const postId = location?.pathname?.replace("/post/", "")
    useEffect(() => {

        axios(`https://socially-server-sofiuzzamansofi.vercel.app/post/${postId}`)
            .then(data => {
                setPost(data?.data?.data)
            })

    }, [postId, likeCommentRender]);



    // add commets functions---
    const handleAddcomment = (event) => {
        event.preventDefault();
        const commentText = event.target?.commentText?.value;
        const comment = {
            commenterDisplayName: user?.displayName,
            commenterEmail: user?.email,
            commenterPhotoURL: user?.photoURL,
            commentText: commentText,
        };
        // console.log(comment);
        axios.put(`https://socially-server-sofiuzzamansofi.vercel.app/post/comments/${post?._id}`, comment)
            .then(data => {
                // console.log("comments axios success:", data?.data);
                setLikeCommentRender(!likeCommentRender);
                toast.success(`Dear ${user?.displayName}, your comment is added successfully.`);
                event?.target?.reset();
            })
            .catch(error => console.log("error from comment add axios catch:", error));
    };

    // add like functions ----
    const handleADdLike = () => {
        const like = {
            likerDisplayName: user?.displayName,
            likerEmail: user?.email,
            likerPhotoURL: user?.photoURL,
        };
        // console.log(like);
        axios.put(`https://socially-server-sofiuzzamansofi.vercel.app/post/likes/${post?._id}`, like)
            .then(data => {
                // console.log("like axios success:", data?.data);
                setLikeCommentRender(!likeCommentRender);
                toast.success(`Dear ${user?.displayName}, your like is added successfully.`);
            })
            .catch(error => console.log("error from comment add axios catch:", error));
    }


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


                {/* show like and comments count number ------ */}
                <div className=' flex justify-between px-4'>
                    {post?.likes && post?.likes?.length ? <p className='flex gap-2'><BiLike className='bg-sky-500 w-6 h-6 rounded-full text-white p-[1px]' />{post?.likes?.length}</p> : <p></p>}

                    {post?.comments && <p>{post?.comments?.length} comments</p>}
                </div>


                {/* like comments share add section -- */}
                {/* <div className='p-5 border-y-[1px] flex justify-between items-center h-16 absolute bottom-5 left-0 right-0 mt-96'> */}
                <div className='p-5 border-y-[1px] flex justify-between items-center h-16'>
                    <BiLike className='h-8 w-8 hover:text-[#046380] cursor-pointer'
                        onClick={handleADdLike}
                    />
                    <a href="#comments"><BiComment className='h-8 w-8 hover:text-[#046380] cursor-pointer' /></a>
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
                                type="text" placeholder='write your comments' name='commentText' id="comments"
                                className='p-4 rounded-md border border-black w-full'
                            />
                        </form>
                    </div>




                    {/* show all comments section --- */}   {/* used flex reversed to short --- */}
                    <div className='flex flex-col-reverse gap-4'>
                        {post?.comments && post?.comments.map((comment, index) => <div key={index} className='flex gap-4 items-center'>
                            <PhotoProvider>
                                <PhotoView src={comment?.commenterPhotoURL ? comment?.commenterPhotoURL : noImgFound} >
                                    <img src={comment?.commenterPhotoURL ? comment?.commenterPhotoURL : noImgFound} alt="" className='cursor-pointer w-10 md:w-16 rounded-full border border-[#046380]' title='click to full view' />
                                </PhotoView>
                            </PhotoProvider>
                            <div>
                                <p>{comment?.commenterDisplayName}</p>
                                <p>{comment?.commentText}</p>
                            </div>
                        </div>)}

                    </div>
                </div>

            </div>
        </div>
    );
};

export default MediaDetails;