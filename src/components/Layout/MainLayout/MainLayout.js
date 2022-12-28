import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../Pages/SharedPages/Footer/Footer';
import Navbar from '../../Pages/SharedPages/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                {/* <Outlet /> */}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;