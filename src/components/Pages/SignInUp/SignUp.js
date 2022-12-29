import { Axios } from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Social from './Social';
import loginImg from "../../assets/loginImg.gif"



const SignUp = () => {

    const { createNewUser, updateUser, loading } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm(); //useForm react hook ....
    const [signUpError, setSignUpError] = useState("");
    const [signUpLoading, setSignUpLoading] = useState(false);


    // navigati location------
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";



    // signin update name, send email verify  function----------------
    const handleSignUp = data => {
        setSignUpLoading(false);
        setSignUpError("");

        // host image on imgbb --
        const image = data.image[0];
        // IMAGE BB HOT KEY --
        const imageHostingKey = process.env.REACT_APP_imgbb_key_ElonDahkaEmail;
        const formData = new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
        fetch(url, {
            method: "POST",
            body: formData,
        }).then(res => res.json())
            .then(imageInfo => {
                // console.log(imageInfo)
                if (imageInfo?.success) {
                    const img = imageInfo?.data?.url;


                    // create NEW user function --
                    createNewUser(data.email, data.password)
                        .then(result => {
                            const user = result.user;
                            const userInfo = {
                                displayName: data.name,
                                photoURL: img
                            };
                            // console.log(userInfo);
                            //update NAME  & photo on firebase---
                            updateUser(userInfo)
                                .then(() => {
                                    // saveDbOnUser(user);
                                    // setSignUpLoading(true);
                                    navigate(from, { replace: true });
                                })
                                .catch(error => {
                                    setSignUpError(error.message);

                                });
                            toast.success("User Created Successfully");
                        }).catch(error => {
                            setSignUpError(error.message);
                        });
                }
            })
            .catch(error => {
                console.log("error imageBB:", error)
                // setSignUpLoading(true);
            });
        setSignUpLoading(true);
    };

    // // save user on database ---
    // const saveDbOnUser = user => {
    //     if (isSeller) {
    //         user.role = "seller"
    //     };
    //     Axios({
    //         method: "POST",
    //         url: "https://machineries-sells-server-sofiuzzamansofi.vercel.app/user",
    //         data: {
    //             displayName: user?.displayName,
    //             email: user?.email,
    //             role: user?.role,
    //         }
    //     }).then(res => {

    //         if (res?.data?.success) {
    //             // setCreateUserEmail(user?.email);
    //             navigate(from, { replace: true });
    //         } else {
    //             // console.log(res?.data?.success)
    //             return false;
    //         };
    //     });
    // }




    return (
        <div className='min-h-screen flex justify-center items-center  gap-10'>
            <div className='hidden md:block'>
                <img src={loginImg} alt="" className='w-full  rounded-md' />
            </div>

            <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-900 dark:text-gray-100 border">
                <h2 className="mb-3 text-3xl font-semibold text-center bg-[#046380] text-white hover:bg-[#025e7a] py-5">Sign Up</h2>



                <form
                    onSubmit={handleSubmit(handleSignUp)}
                    noValidate="" action="" className=" ng-untouched ng-pristine ng-valid"
                >
                    <div className="pb-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm">Full Name</label>
                            <input {...register("name", { required: true })} type="text" placeholder="Full name" className="w-full py-1 px-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
                            <p className='text-xs text-red-700'>{errors?.name ? "Pls Input Full Name." : ""}</p>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="image" className="block text-sm">Image</label>
                            <input {...register("image", { required: "Image if required" })} type="file" name="image" id="image" placeholder="your full name" className="w-full py-  border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
                            {errors?.image ? <p className='text-[10px] text-red-600'>{errors?.image?.message}</p> : ""}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm">Email address</label>
                            <input  {...register("email", { required: "Email is required." })} type="email" name="email" id="email" placeholder="example@mail.com" className="w-full py-1 px-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
                            {errors?.email ? <p className='text-[10px] text-red-600'>{errors?.email?.message}</p> : ""}
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label htmlFor="password" className="text-sm">Password</label>
                            </div>
                            <input
                                {...register("password",
                                    {
                                        required: "Password is required.",
                                        minLength: { value: 6, message: "minimum length is 6 character." },
                                        pattern: { value: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: "Password Must Be Strong: AA##11cc " }
                                    }
                                )}
                                type="password" name="password" id="password" placeholder="*****" className="w-full py-1 px-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
                            {errors?.password ? <p className='text-[10px] text-red-600'>{errors?.password?.message}</p> : ""}
                            {signUpError && <p className='text-[10px] text-red-600'>{signUpError}</p>}
                        </div>
                    </div>

                    <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-[#046380] text-white hover:bg-[#025e7a]">
                        {signUpLoading ? "Loading..." : "Sign Up"}
                    </button>

                </form>



                <div className="flex items-center w-full my-1">
                    <hr className="w-full dark:text-gray-400" />
                    <p className="px-3 dark:text-gray-400 text-sm">or</p>
                    <hr className="w-full dark:text-gray-400" />
                </div>

                {/* social icons login--  */}
                <Social />


                <p className="text-sm text-center dark:text-gray-400">Already have an account?
                    <Link to="/signin" rel="noopener noreferrer" className="focus:underline hover:underline text-[#046380]  hover:text-[#025e7a]" alt=""> Sign In</Link>
                </p>
            </div>
        </div>
    );
};


export default SignUp;