import React, {memo} from 'react';
import useTypedPage from "@hooks/useTypedPage";
import {IUser} from "@/types/IUser";

const Balance: React.FC = () => {
    const page = useTypedPage<IUser>();

    return (
        <div className="ml-3 relative">

        </div>
    );
}

export default memo(Balance);
