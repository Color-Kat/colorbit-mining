import React from 'react';
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';
import CLink from "../../components/CLink";
import { IPage } from "../../types/IPage";

const Farm: IPage = React.memo(() => {
    const route = useRoute();
    const page = useTypedPage();

    return (
        <div>

            <CLink href='/dashboard'>Farms</CLink>

        </div>
    );
});

// Farms.layout = (page) => <AppLayout title="123" children={page} />;

export default Farm;
