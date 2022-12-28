import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Social from './Social';
import loginImg from "../../assets/loginImg.gif"


const SignIn = () => {


    const { login, loading } = useContext(AuthContext);
    const [loginError, setLoginError] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signUpLoading, setSignUpLoading] = useState(false);
    // const [loginUserEmail, setLoginUserEmail] = useState("");



    // location navigation ---
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";


    // handle sign function ---
    const handleSign = (data) => {
        setSignUpLoading(false);
        setLoginError("")
        login(data.email, data.password)
            .then(result => {
                const user = result.user;
                toast.success("User Login Successfully.", user?.displayName);
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error)
                setLoginError(error.message)
            });
        setSignUpLoading(true);
    };







    return (
        <div className='min-h-screen flex justify-center items-center gap-10'>
            <div className='hidden md:block'>
                <img src={loginImg} alt="" className='w-full max-w-[700px] rounded-md' />
            </div>

            <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-900 dark:text-gray-100  border">
                <h2 className="mb-3 text-3xl font-semibold text-center bg-[#046380] text-white hover:bg-[#025e7a] py-5">Sign In</h2>



                <form onSubmit={handleSubmit(handleSign)} noValidate="" action="" className="space-y-8 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm">Email address</label>
                            <input {...register("email", { required: true, })} type="email" name="email" id="email" placeholder="example@mail.com" className="w-full py-1 px-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
                            {errors?.email ? <p className='text-[10px] text-red-600'>"email is required"</p> : ""}
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label htmlFor="password" className="text-sm">Password</label>
                                <Link rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-400">Forgot password?</Link>
                            </div>
                            <input
                                {...register("password",
                                    {
                                        required: "password",
                                        minLength: { value: 6, message: "minimum length is 8 character" },
                                        pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/, message: "Password must 2 Capital 2 Spacial character 2 number and 2 small : example: AA$#11aa" }
                                    }
                                )}
                                type="password" name="password" id="password" placeholder="*****" className="w-full py-1 px-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
                            {errors?.password && <p role="alert" className='text-[10px] text-red-600'>{errors?.password?.message}</p>}
                            {loginError && <p className='text-[10px] text-red-600'>{loginError}</p>}
                            <p className='text-[10px] py-1 hover:underline hover:text-cyan-500 cursor-pointer'>Forgot Password</p>
                        </div>
                    </div>
                    <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-[#046380] text-white hover:bg-[#025e7a]]">
                        {signUpLoading ? "Loading..." : "Sign In"}
                    </button>
                </form>

                <div className="flex items-center w-full my-4">
                    <hr className="w-full dark:text-gray-400" />
                    <p className="px-3 dark:text-gray-400 text-sm">or</p>
                    <hr className="w-full dark:text-gray-400" />
                </div>

                {/* social icons login--  */}
                <Social />


                <p className="text-sm text-center dark:text-gray-400">Don't have account?
                    <Link to="/signUp" rel="noopener noreferrer" className="focus:underline hover:underline text-[#046380]  hover:text-[#025e7a]" alt=""> Sign up here</Link>
                </p>
            </div>
        </div>
    );
};



export default SignIn;