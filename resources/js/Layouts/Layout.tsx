import React from 'react';
import Header from "@components/page/Header";
import Main from "@components/page/Main";
import Footer from "@components/page/Footer";

const Layout: React.FC<{children: React.ReactElement}> = ({children}) => {
    // TODO scroll to top when navigate
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
