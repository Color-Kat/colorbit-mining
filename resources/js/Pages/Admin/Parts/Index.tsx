import React from "react";
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';
import {IPage} from "@/types/IPage";
import AdminLayout from "@components/admin/AdminLayout";
import Paginator from "@components/elements/Paginator";
import {IPaginator} from "../../../types/IPaginator";
import {IPart} from "../../../types/parts/IPart";
import AdminPartsListLayout from "../../../components/admin/AdminPartsListLayout";


const AdminPartsList: IPage = React.memo(() => {
    const route = useRoute();
    const page = useTypedPage<{
        parts: IPaginator<IPart>
    }>();

    const paginator = page.props.parts;
    const parts: IPart[] = page.props.parts.data;

    return (
        <AdminPartsListLayout title="Комплектующие" description="Управляйте списком комплектующих здесь">
            <div>
                {parts.map(part => {
                    return (
                        <div>
                            {part.name}
                        </div>
                    );
                })}
            </div>

            <Paginator paginator={paginator} />
        </AdminPartsListLayout>
    );
});


export default AdminPartsList;
