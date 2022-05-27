import React from 'react';

const Main: React.FC<{children: React.ReactElement}> = ({children}) => {

    return (
        <div
            className="bg-red-100"
        >

            {children}

        </div>
    );
}

export default Main;
