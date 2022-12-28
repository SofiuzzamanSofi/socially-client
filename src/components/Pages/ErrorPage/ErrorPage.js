import React from 'react';
import ButtonPublic from '../SharedPages/ButtonPublic/ButtonPublic';



const ErrorPage = () => {
    return (
        <div
            // className='flex items-center justify-center min-h-screen mt-[-63px] md:mt-[-96px] mb-[-261px] md:mb-[-201px] bg-slate-50 text-black dark:bg-black dark:text-white'
            className='flex items-center justify-center min-h-screen  bg-slate-50 text-black dark:bg-black dark:text-white'
        >
            <section className="container flex flex-col items-center justify-center p-5">
                <div className="max-w-md text-center">
                    <div>
                        <label className="swap swap-flip text-9xl">

                            {/* <!-- this hidden checkbox controls the state --> */}
                            <input type="checkbox" />

                            <div className="swap-on">😈</div>
                            <div className="swap-off">😇</div>
                        </label>
                    </div>
                    <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
                    <p className=" py-6">But dont worry, you can find plenty of other things on our homepage.</p>
                    <ButtonPublic
                        too={""}
                        text={"Back to homepage"}
                        size={""}
                    />
                </div>
            </section>
        </div>
    );
};


export default ErrorPage;