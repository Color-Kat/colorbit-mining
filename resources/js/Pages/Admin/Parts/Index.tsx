import React from "react";
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';
import {IPage} from "@/types/IPage";
import AdminLayout from "@components/admin/AdminLayout";
import Paginator from "@components/elements/Paginator";
import {IPaginator} from "../../../types/IPaginator";


const AdminPartsList: IPage = React.memo(() => {
    const route = useRoute();
    const page = useTypedPage<{
        parts: IPaginator<IPart>
    }>();

    const paginator = page.props.parts;
    const parts: IPart[] = page.props.parts.data[0].;

    return (
        <AdminLayout title="Комплектующие" description="Управляйте списком комплектующих здесь">
            <div>
                data
            </div>

            <Paginator paginator={paginator} />
        </AdminLayout>
    );
});


export default AdminPartsList;
