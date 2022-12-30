import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import LoadingSpinner from '../LoadingPage/LoadingSpinner';
import noImgFound from "../../assets/noImgFound.png"
import { PhotoProvider, PhotoView } from 'react-photo-view';
import ProfileModal from './ProfileModal';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';




const Profile = () => {
    const { user, loading, updateUser } = useContext(AuthContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [loadingModalButton, setLoadingModalButton] = useState(false);
    const [modalData, setModalData] = useState(false);
    const [modalEditedData, setModalEditedData] = useState("");

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["email"],
        queryFn: async () => {
            const res = await fetch(`https://socially-server-sofiuzzamansofi.vercel.app/user?email=${user?.email}`);
            const data = await res.json();
            if (data?.success) {
                return data?.data;
            } else { return data.success };
        },
    });

    useEffect(() => {
        if (data) {
            setModalData(data);
            setModalEditedData(data);
        } else {
            setModalData({
                displayName: user?.displayName,
                email: user?.email,
            });
            setModalEditedData({
                displayName: user?.displayName,
                email: user?.email,
            });
        };
    }, [data, user]);



    const handleEditData = () => {
        setLoadingModalButton(true);
        const userInfo = {
            displayName: modalEditedData?.displayName,
        };
        updateUser(userInfo)
            .then(() => {
                axios.put(`https://socially-server-sofiuzzamansofi.vercel.app/user?email=${user?.email}`, modalEditedData)
                    .then(data => {
                        toast.success(`Dear ${user?.displayName}, your info is edited successfully.`);
                        refetch();
                    })
                    .catch(error => console.log("error from pfofile section, axios edit function"))

                setLoadingModalButton(false);
                setModalOpen(false);
            })
            .catch(error => {
                console.log("error from profile update name on firebase", error);;

            });
    };

    if (loading && isLoading) {
        return <LoadingSpinner />
    };



    return (
        <div>
            <section className="flex items-center justify-center  sm:p-16 dark:bg-gray-900 dark:text-gray-100 relative">
                <button
                    className={"py-2 md:py-4  px-4 md:px-9 rounded-md border-[3px] border-[#046380] hover:bg-[#046380] hover:text-white absolute top-5 right-5"}
                    id="Edit"
                    onClick={e => setModalOpen(e?.target?.id)}
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
                        <p className="">Name:{modalData?.displayName} </p>
                        <p className="">Email:{modalData?.email}</p>
                        <p className="">University: {modalData?.university}</p>
                        <p className="">Profession: {modalData?.profession}</p>
                    </div>
                    <div>
                        <p className="md:text-xl">Address: {modalData?.address}</p>
                    </div>

                </div>
            </section>
            {
                modalOpen && <ProfileModal
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    loadingModalButton={loadingModalButton}
                    handleEditData={handleEditData}
                    modalData={modalData}
                    modalEditedData={modalEditedData}
                    setModalEditedData={setModalEditedData}
                />
            }
        </div>
    );
};

export default Profile;