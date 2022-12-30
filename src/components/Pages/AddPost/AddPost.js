import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import addPostImg from '../../assets/addPostImg.png';
import { AuthContext } from '../../context/AuthProvider';
import { FaArrowCircleRight } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useImgbb from '../SharedPages/hooks/useImgbb';










const AddPost = () => {

    const { user } = useContext(AuthContext);
    const [titleDetails, setTitleDetails] = useState("");
    const [submitButton, setSubmitButton] = useState(false);
    const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
    const [signInButton, setSignInButton] = useState(false);
    const [imgUrlFromImgbbHook, setImgUrlFromImgbbHook] = useState(null);
    const [imgUrlFromImgbb, setImgUrlFromImgbb] = useImgbb(imgUrlFromImgbbHook);
    // const [imagePrv, setImgPrv] = useState(null);
    // const [imagePrview, setImgPrview] = useState(null);
    const navigate = useNavigate();

    // user form hook ------
    const { register, handleSubmit, formState: { error } } = useForm();


    const handlePost = data => {
        setTitleDetails(data);
    };


    useEffect(() => {
        if (titleDetails?.title?.length >= 10 && titleDetails?.details?.length >= 25) {
            setSubmitButton(true);
        } else {
            setSubmitButton(false);
        }
    }, [titleDetails]);

    // useEffect(() => {
    //     if (imagePrv) {
    //         const reader = new FileReader();
    //         console.log("reader", reader);
    //         reader.onloadend = () => {
    //             setImgPrview(imagePrv?.result);
    //         }
    //         reader.readAsDataURL(imagePrv);
    //     } else {
    //         setImgPrview(null);
    //     }
    // }, [imagePrv]);


    const handleAddPost = () => {
        if (!user) {
            return setSignInButton(true);
        }
        setSubmitButtonLoading(true);
        // host image on imgbb --
        setImgUrlFromImgbbHook(titleDetails);
    };

    useEffect(() => {
        if (imgUrlFromImgbb) {
            let post = {
                postOwnerName: user?.displayName,
                postOwnerEmail: user?.email,
                postOwnerPhoto: user?.photoURL ? user?.photoURL : "",
                postTitle: titleDetails?.title,
                postDetails: titleDetails?.details,
                postImage: imgUrlFromImgbb === "noImg" ? "" : imgUrlFromImgbb,
            };
            console.log("posttt", post);
            axios.post("http://localhost:5000/post", post)
                .then(data => {
                    const axiosData = data?.data;
                    if (axiosData?.data?.acknowledged) {
                        toast.success(`Dear ${user?.displayName} successfully post a moment`);
                        navigate("/media");
                    } else { toast.error("Something went wrong, pls try again letter.") };
                });
        }
    }, [imgUrlFromImgbb]);

    // console.log("imag under useEfferct:", imgUrlFromImgbb)

    return (
        <div className='py-5'>
            <div>
                <h1 className='text-center text-xl md:text-2xl py-5'>What's on your mind, {user?.displayName}?</h1>
            </div>
            <div className='md:flex gap-4 justify-center'>
                <div className='flex items-center'>
                    <img src={addPostImg} alt="" className='w-full rounded-sm md:rounded-md md:min-h-[250px] md:' />
                </div>
                <div className='md:min-w-[300px]'>
                    <h1 className='text-center text-lg'>Create A post? Write here pls. </h1>
                    <div
                        // onChange={event => handleAddPost(event)}
                        onChange={handleSubmit(handlePost)}
                    >


                        <input
                            className="input input-bordered w-full"
                            placeholder="Your post title/ your mood ...min 10 words"
                            {...register("title", { required: true, })}
                        />
                        <input
                            className="input input-bordered w-full mt-2"
                            placeholder="Your post title/ your mood ..."
                            {...register("image", { required: "Image if required" })}
                            type="file" accept='image/*'
                        />
                        {/* <div className='imgPreview'>
                            imgPreview
                        </div> */}
                        {/* <img src={imagePrview ? imagePrview : ""} alt="" /> */}
                        <textarea
                            className="textarea textarea-bordered h-24 w-full my-2"
                            placeholder="detail, what ever you want to post ...  details minimum 25 character"
                            {...register("details", { required: true, })}
                        >

                        </textarea>
                        <div className="">
                            {
                                signInButton ?
                                    <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-[#046380] text-white hover:bg-[#025e7a]]">
                                        <Link to="/signin" className='flex justify-center items-center gap-2'>

                                            Before post <span><FaArrowCircleRight /></span> Sign In pls
                                        </Link>
                                    </button>
                                    :
                                    <button type="submit" className={`w-full px-8 py-3 font-semibold rounded-md ${submitButton ? "bg-[#046380] text-white" : " border border-black "}   hover:bg-[#025e7a]]`}
                                        disabled={!submitButton}
                                        onClick={handleAddPost}
                                    >
                                        {submitButtonLoading ? "Posting..." : "Make a Post"}
                                    </button>
                            }

                        </div>
                    </div>

                </div>
            </div>
            {/* {titleDetails?.file[0] ? <img src='' className='imgPreview' alt=''>
                imgPreview
            </img> : ""} */}
        </div>
    );
};

export default AddPost;