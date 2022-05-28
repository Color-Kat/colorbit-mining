import React from 'react';

const Main: React.FC<{ children: React.ReactElement }> = ({children}) => {

    return (
        <main
            className="flex-auto flex-shrink-0 flex justify-center  bg-slate-700"
        >

            <div className="container px-2 sm:px-5 flex justify-center">
                {children}
            </div>

        </main>
    );
}

export default Main;
