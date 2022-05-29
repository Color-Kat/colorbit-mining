import React from 'react';

const Test = React.memo(()=>{
    console.log('test')
    return <span>Test</span>
})

const Main: React.FC<{ children: React.ReactElement, a: any }> = ({ children, a }) => {
    return (
        <main
            className="flex-auto flex-shrink-0 flex justify-center app-bg"
        >
            {a}
            <Test/>
            <div className="container px-2 sm:px-5 flex justify-center">
                {children}
            </div>


        </main>
    );
}

export default React.memo(Main);
