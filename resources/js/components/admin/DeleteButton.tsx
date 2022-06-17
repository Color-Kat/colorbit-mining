import React from 'react';

export const DeleteButton: React.FC<{onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void}> = React.memo(({onClick}) => {
    return (
        <button
            onClick={onClick}
            className='inline-flex items-center px-4 py-2 bg-red-600
             rounded-smx font-bold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-500 focus:outline-none'
        >
            Удалить
        </button>
    );
})
