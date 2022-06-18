import React, {useState} from "react";
import useTypedPage from '@hooks/useTypedPage';
import {IPage} from "@/types/IPage";
import {IPart} from "@/types/parts/IPart";
import AdminPartsListLayout from "@components/admin/AdminPartsListLayout";

const AdminPartCreate: IPage = React.memo(() => {
    const [data, setDate] = useState(null);

    const createPart = () => {
        console.log('update', data);
    }

    return (
        <AdminPartsListLayout title="Редактирование" description="Изменяйте свойства комплектующих здесь">

            create

        </AdminPartsListLayout>
    );
});


export default AdminPartCreate;
