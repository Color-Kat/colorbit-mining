import React, {ReactNode} from "react";

// Black background
export const Section: React.FC<{children: ReactNode}>
    = React.memo(({children}) => {
    return (
        <div className="rounded-lg app-bg-dark text-app shadow-md mb-4 px-5 py-5">
            {children}
        </div>
    );
});
