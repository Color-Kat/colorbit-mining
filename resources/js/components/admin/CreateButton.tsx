import React from 'react';

export const CreateButton: React.FC<{onClick: () => void}> = React.memo(({onClick}) => {
    return (
        <button
            onClick={onClick}
            className='w-full h-11 my-3 mb-4 px-7 font-bold uppercase tracking-widest text-base rounded-md bg-gray-300/[0.8] hover:bg-gray-300/[0.9] text-app-black'
        >
            Создать
        </button>
    );
})
