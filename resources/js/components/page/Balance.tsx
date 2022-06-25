import React, {memo} from 'react';
import useTypedPage from "@hooks/useTypedPage";
import {User} from "../../types/types";

const Balance: React.FC = () => {
    const page = useTypedPage<User>();


    return (
        <div className="ml-3 relative">

        </div>
    );
}

export default memo(Balance);
