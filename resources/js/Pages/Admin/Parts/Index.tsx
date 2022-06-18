import React from "react";
import useTypedPage from '@hooks/useTypedPage';
import {IPage} from "@/types/IPage";
import Paginator from "@components/elements/Paginator";
import {IPaginator} from "@/types/IPaginator";
import {IPart} from "@/types/parts/IPart";
import AdminPartsListLayout from "@components/admin/AdminPartsListLayout";
import {IBasePart} from "@/types/parts/IBasePart";
import {CreateButton} from "../../../components/admin/CreateButton";
import {PartsList} from "../../../components/admin/PartsList";


const AdminPartsList: IPage = React.memo(() => {
    const page = useTypedPage<{
        parts: IPaginator<IPart>
    }>();

    const paginator = page.props.parts;
    const parts: IBasePart[] = page.props.parts.data;

    const createPart = () => {
        console.log('create');
    }

    return (
        <AdminPartsListLayout title="Все комплектующие" description="Управляйте списком комплектующих здесь">

            <div className="text-right"><CreateButton onClick={createPart} /></div>

            <PartsList parts={parts} />

            <Paginator paginator={paginator}/>
        </AdminPartsListLayout>
    );
});


export default AdminPartsList;
