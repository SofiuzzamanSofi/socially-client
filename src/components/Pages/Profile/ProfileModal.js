import React from 'react';
import { FiXCircle } from "react-icons/fi";

const ProfileModal = ({ modalOpen, setModalOpen, loadingModalButton, handleEditData, modalData, modalEditedData, setModalEditedData }) => {






    return (
        <section className='fixed top-0 right-0 bottom-0 left-0 z-10  flex justify-center items-center'>
            <div className='bg-slate-200 dark:bg-black p-5 rounded-md relative'>
                <button className='absolute top-2 right-2'                                >
                    <FiXCircle className='w-8 h-8'
                        onClick={() => setModalOpen(false)}
                    />
                </button>
                <div className='pt-5'>
                    <p>
                        Are you sure You wan't to {modalOpen}?
                    </p>
                    {modalOpen === "Edit" ?
                        // <textarea
                        //     onBlur={(event) =>
                        //         setCommentText(event.target.value)} className="w-full h-40 rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"
                        //     defaultValue={commentText}
                        // >

                        // </textarea>
                        <div className='pt-4 md:min-w-[450px] grid gap-2'>
                            <div>
                                <p>Email:</p>
                                <input
                                    defaultValue={`${modalData?.email}   (uneditable)`}
                                    className='w-full p-2 rounded-md' type="text" disabled
                                />
                            </div>
                            <div>
                                <p>Name:</p>
                                <input
                                    onBlur={e => setModalEditedData({ ...modalEditedData, displayName: e.target.value })}
                                    defaultValue={modalData?.displayName}
                                    className='w-full p-2 rounded-md' type="text"
                                />
                            </div>
                            <div>
                                <p>University:</p>
                                <input
                                    onBlur={e => setModalEditedData({ ...modalEditedData, university: e.target.value })}
                                    defaultValue={modalData?.university}
                                    placeholder="university name"
                                    className='w-full p-2 rounded-md' type="text"
                                />
                            </div>
                            <div>
                                <p>Profession:</p>
                                <input
                                    onBlur={e => setModalEditedData({ ...modalEditedData, profession: e.target.value })}
                                    defaultValue={modalData?.profession}
                                    placeholder="work/profession"
                                    className='w-full p-2 rounded-md' type="text"
                                />
                            </div>
                            <div>
                                <p>Address:</p>
                                <input
                                    onBlur={e => setModalEditedData({ ...modalEditedData, address: e.target.value })}
                                    defaultValue={modalData?.address}
                                    placeholder="full address"
                                    className='w-full p-2 rounded-md' type="text"
                                />
                            </div>
                        </div>
                        :
                        ""
                    }
                    <div className='flex justify-between gap-5'>
                        <button
                            className="py-4 my-8 font-semibold rounded-md border-[3px] border-[#046380] bg-[#046380d2] hover:bg-[#046380] text-white w-36 text-center m-auto"
                            onClick={
                                modalOpen === "Edit" ?
                                    handleEditData
                                    :
                                    ""
                            }
                        >
                            {loadingModalButton ? "Updating..." : "Yes"}
                        </button>
                        <button
                            className="py-4 my-8 font-semibold rounded-md border-[3px] border-[#046380] bg-[#046380d2] hover:bg-[#046380] text-white w-36 text-center m-auto"
                            onClick={() => setModalOpen(false)}
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfileModal;