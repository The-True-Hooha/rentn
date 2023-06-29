import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <main className='sm:h-[90vh]' >
                {children}
            </main>
            <Footer />
        </>
    );
};

export default Layout;
