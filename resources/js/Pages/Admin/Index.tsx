import React from "react";
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';
import {IPage} from "@/types/IPage";
import AdminSection from "../../components/admin/AdminSection";

interface Props {

}

const AdminDashboard: IPage = React.memo(() => {
    const route = useRoute();
    const page = useTypedPage();

    return (
        <AdminSection
            title="Админ панель"
            description="Тут вы можете оздавать новые комплектующие, управлять другими игроками и накручивать деньги."
        >
            fsdf
        </AdminSection>


    );
});

export default AdminDashboard;
