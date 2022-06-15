import React from "react";
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';
import {IPage} from "@/types/IPage";
import {TabsLinks} from "../../../components/elements/TabsLink";
import {AdminDashboardSection} from "../Index";

interface Props {

}

const AdminPartsList: IPage = React.memo(() => {
    const route = useRoute();
    const page = useTypedPage();

    console.log(page)

    return (
        <AdminDashboardSection title="Всё">

            <TabsLinks links={[{
                title: 'Всё',
                href: 'fsad'
            }]}>
                das
            </TabsLinks>

        </AdminDashboardSection>
    );
});

// Farms.layout = (page) => <AppLayout title="123" children={page} />;

export default AdminPartsList;
