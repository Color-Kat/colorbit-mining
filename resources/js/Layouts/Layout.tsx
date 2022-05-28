import React from 'react';
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

const Layout: React.FC<{children: React.ReactElement}> = ({children}) => {

    return (
        <div
            className="min-h-screen bg-gray-100"
        >

            <Header />

            <Main>
                {children}
            </Main>

            <Footer />

        </div>
    );
}

export default Layout;
