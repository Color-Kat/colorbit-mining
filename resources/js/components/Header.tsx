import React from 'react';

const Header: React.FC<{children: React.ReactElement}> = ({children}) => {

    return (
        <header
            className=""
        >

            {children}

        </header>
    );
}

export default Header;
