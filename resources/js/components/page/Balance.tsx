import React, {memo} from 'react';
import useTypedPage from "@hooks/useTypedPage";

const Balance: React.FC = () => {
    const page = useTypedPage();

    return (
        <div className="absolute w-full h-full flex justify-center">
            <div className="container relative">
                <div
                    className="app-bg-light text-gray-700 rounded-b-md py-0.5 px-4 font-sans text-lg absolute right-5 bottom-0 translate-y-full shadow-md z-0">
                    {page.props.user.money}$
                </div>
            </div>
        </div>
    );
}

export default memo(Balance);
