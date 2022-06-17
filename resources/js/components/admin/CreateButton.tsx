import React from 'react';

export const CreateButton: React.FC<{onClick: () => void}> = React.memo(({onClick}) => {
    return (
        <button
            onClick={onClick}
            className='w-full h-11 my-3 mb-4 px-7 font-bold uppercase tracking-widest text-base rounded-md bg-green-700 text-app-light hover:bg-green-700/[0.95]'
        >
            Создать
        </button>
    );
})
