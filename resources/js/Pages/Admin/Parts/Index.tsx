import React from "react";
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';
import {IPage} from "@/types/IPage";

interface Props {

}

const AdminPartsList: IPage = React.memo(() => {
    const route = useRoute();
    const page = useTypedPage();

    console.log(page)

    return (
        <div>

            123

        </div>
    );
});

// Farms.layout = (page) => <AppLayout title="123" children={page} />;

export default AdminPartsList;
