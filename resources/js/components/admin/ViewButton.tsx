import React from 'react';

export const ViewButton: React.FC<{onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void}> = React.memo(({onClick}) => {
    return (
        <button
            onClick={onClick}
            className='inline-flex items-center px-4 py-2 rounded-smx font-bold text-xs  uppercase tracking-widest bg-gray-300/[0.8] hover:bg-gray-300/[0.9] text-app-black'
        >
            Открыть
        </button>
    );
});
