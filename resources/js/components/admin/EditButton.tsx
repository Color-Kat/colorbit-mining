import React from 'react';

export const EditButton: React.FC<{onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void}> = React.memo(({onClick}) => {
    return (
        <button
            onClick={onClick}
            className='inline-flex items-center px-4 py-2 bg-amber-500 rounded-smx font-bold text-xs text-gray-900 uppercase tracking-widest hover:bg-amber-500/[0.95] active:bg-amber-500 focus:outline-none'
        >
            Изменить
        </button>
    );
})
