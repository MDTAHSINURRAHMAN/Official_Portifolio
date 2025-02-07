import React from 'react';  
import Navbar from '../conponents/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../conponents/Footer';
const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;