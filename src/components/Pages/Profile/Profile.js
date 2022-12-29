import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import LoadingSpinner from '../LoadingPage/LoadingSpinner';
import noImgFound from "../../assets/noImgFound.png"
import { PhotoProvider, PhotoView } from 'react-photo-view';

const Profile = () => {
    const { user, loading } = useContext(AuthContext);


    if (loading) {
        return <LoadingSpinner />
    };
    return (
        <div>
            <section className="flex items-center justify-center  sm:p-16 dark:bg-gray-900 dark:text-gray-100 relative">
                <button
                    className={"py-2 md:py-4  px-4 md:px-9 rounded-md border-[3px] border-[#046380] hover:bg-[#046380] hover:text-white absolute top-5 right-5"}
                >
                    Edit
                </button>
                <div className="py-5 flex flex-col gap-5 pt-20 md:pt-0">
                    <div className=' flex items-center justify-center'>
                        <PhotoProvider>
                            <PhotoView src={user?.photoURL ? user?.photoURL : noImgFound} >
                                <img src={user?.photoURL ? user?.photoURL : noImgFound} alt="" className='cursor-pointer w-full max-w-[500px] rounded-full' title='click to view full page' />
                            </PhotoView>
                        </PhotoProvider>
                    </div>
                    <div className='grid gap-5 md:grid-cols-2 text-left md:text-xl'>
                        <p className="">Name:{user?.displayName} </p>
                        <p className="">Email:{user?.email}</p>
                        <p className="">University:</p>
                        <p className="">Profession:</p>
                    </div>
                    <div>
                        <p className="md:text-xl">Address:</p>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Profile;