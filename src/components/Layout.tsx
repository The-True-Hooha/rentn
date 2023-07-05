import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useRouter } from "next/router";
const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const excludeFooter = router.pathname === '/Authentication'; // Specify the route where you want to exclude the footer
    return (
        <section className="flex flex-col min-h-screen h-screen overflow-none">
            <Navbar />
            <main className='flex flex-1 justify-center items-center' >
                {children}
            </main>
            {!excludeFooter && <Footer />}
        </section>
    );
};

export default Layout;
