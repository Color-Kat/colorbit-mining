import React from "react";
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';
import {IPage} from "@/types/IPage";
import AdminLayout from "../../../components/admin/AdminLayout";

interface Props {

}

const AdminPartsList: IPage = React.memo(() => {
    const route = useRoute();
    const page = useTypedPage();

    return (
        <AdminLayout title="Комплектующие" description="Управляйте списком комплектующих здесь">
            fsdf
        </AdminLayout>
    );
});


export default AdminPartsList;
