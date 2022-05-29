import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

const Layout: React.FC<{children: React.ReactElement}> = ({children}) => {

    const [state, setState] = useState(100);

    useEffect(()=> {
        setInterval(()=>setState(prev => prev+1), 10);
    }, []);

    return (
        <div
            className="flex flex-col h-screen overflow-auto overflow-x-hidden"
        >

            <Header />

            <Main a={state}>
                {children}
            </Main>

            <Footer />

        </div>
    );
}

export default React.memo(Layout);
