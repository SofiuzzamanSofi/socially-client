import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div>
            <div>
                This is main layout
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;