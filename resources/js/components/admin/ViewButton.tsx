import React from 'react';

export const ViewButton: React.FC<{onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void}> = React.memo(({onClick}) => {
    return (
        <button
            onClick={onClick}
            className='inline-flex items-center px-4 py-2 bg-sky-600 rounded-smx font-bold text-xs text-white uppercase tracking-widest hover:bg-sky-500/[0.95] active:bg-sky-500 focus:outline-none'
        >
            Открыть
        </button>
    );
})
