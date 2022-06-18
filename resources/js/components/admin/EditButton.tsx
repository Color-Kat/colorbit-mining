import React from 'react';

export const EditButton: React.FC<{onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void}> = React.memo(({onClick}) => {
    return (
        <button
            onClick={onClick}
            className='inline-flex items-center px-4 py-2 bg-violet-600 rounded-smx font-bold text-xs text-gray-100 uppercase tracking-widest hover:bg-violet-500 active:bg-violet-600 focus:outline-none'
        >
            Изменить
        </button>
    );
})
