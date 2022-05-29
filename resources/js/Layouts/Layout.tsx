import React from 'react';
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

const Layout: React.FC<{children: React.ReactElement}> = ({children}) => {
    return (
        <div
            className="flex flex-col h-screen overflow-auto overflow-x-hidden"
        >

            <Header />

            <Main>
                {children}
            </Main>

            <Footer />

        </div>
    );
}

export default React.memo(Layout);
