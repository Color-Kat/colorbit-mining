import React, {useState} from "react";
import useTypedPage from '@hooks/useTypedPage';
import {IPage} from "@/types/IPage";
import {IPart} from "@/types/parts/IPart";
import AdminPartsListLayout from "@components/admin/AdminPartsListLayout";

const AdminPartEdit: IPage = React.memo(() => {
    const page = useTypedPage<{
        part: IPart
    }>();

    const [data, setDate] = useState(null);

    const updatePart = () => {
        console.log('update', data);
    }

    return (
        <AdminPartsListLayout title="Редактирование" description="Изменяйте свойства комплектующих здесь">

            edit

        </AdminPartsListLayout>
    );
});


export default AdminPartEdit;
