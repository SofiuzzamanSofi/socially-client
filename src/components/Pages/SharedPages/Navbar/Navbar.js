import React, { useContext } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import logo from "../../../assets/logo.png";
import { AuthContext } from '../../../context/AuthProvider';


const Navbar = () => {


    const { logOut, user, setUser } = useContext(AuthContext);
    const location = useLocation();


    // logout function ---------
    const handleLogOut = () => {
        logOut()
            .then(() => {
                // Sign-out successful.
                localStorage.removeItem("accessToken");
                setUser(null);
            }).catch((error) => {
                // An error happened.
                console.log(error)
            });
    };


    const navbarComponentsOptions = <>
        <li><Link to="/" className='rounded-md border-[#046380] hover:bg-[#046380] hover:text-white'>Home</Link></li>
        <li><Link to="/media" className='rounded-md border-[#046380] hover:bg-[#046380] hover:text-white'>Media</Link></li>
        <li><Link to="/message" className='rounded-md border-[#046380] hover:bg-[#046380] hover:text-white'>Message</Link></li>
        <li><Link to="/about" className='rounded-md border-[#046380] hover:bg-[#046380] hover:text-white'>About</Link></li>
        {
            user?.uid ? <>
                <li><Link to="/profile" className='rounded-md border-[#046380] hover:bg-[#046380] hover:text-white'>Profile</Link></li>
            </> : ""
        }
    </>


    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">


                {/* <!-- Navbar --> */}
                <div className="w-full navbar bg-base-300">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2">
                        <Link to="/" className=''>
                            <img src={logo} alt=""
                                className='w-10 md:w-16 rounded-full '
                            />
                        </Link>
                    </div>
                    <div className="flex-none hidden lg:block">
                        <ul className="menu menu-horizontal">
                            {/* <!-- Navbar menu content here --> */}
                            {navbarComponentsOptions}
                        </ul>
                    </div>



                    {/* <!-- Sign In Out --> */} {/* <!-- profile avater section --> */}
                    <div className="flex-none ">
                        <ul className="menu menu-horizontal">
                            {
                                user ?

                                    <div className="dropdown dropdown-end">
                                        <label tabIndex={0}>
                                            <Link to="" title={user?.displayName}>
                                                <img src={user?.photoURL} alt=""
                                                    className='w-10 md:w-16 rounded-full'
                                                />
                                            </Link>
                                        </label>
                                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">

                                            <li><Link to="" className='w-full rounded-md border-[#046380] hover:bg-[#046380] hover:text-white'>{user?.email}</Link></li>
                                            <li><Link to="/dashboard" className='w-full rounded-md border-[#046380] hover:bg-[#046380] hover:text-white'>Dashboard</Link></li>
                                            <li><Link to="/profile" className='w-full rounded-md border-[#046380] hover:bg-[#046380] hover:text-white'>Profile</Link></li>
                                            <li><Link to="/" className='w-full rounded-md border-[#046380] hover:bg-[#046380] text-error hover:text-white'
                                                onClick={handleLogOut}
                                            >
                                                Log out
                                            </Link></li>

                                        </ul>
                                    </div>
                                    :
                                    <li><Link to="/signin" className='rounded-md border-[1px] border-[#046380] hover:bg-[#046380] hover:text-white'>Sign In</Link></li>
                            }
                        </ul>
                    </div>
                </div>


                {/* <!-- Page content here --> */}
                {/* outlet ----------- */}
                <Outlet />



            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-base-100">
                    {/* <!-- Sidebar content here -- smaller device slider> */}
                    {navbarComponentsOptions}

                </ul>
            </div>
        </div>
    );
};

export default Navbar;