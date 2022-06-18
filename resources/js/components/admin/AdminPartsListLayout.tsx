import React, {ReactNode} from "react";
import {IPage} from "@/types/IPage";
import {TabLinks, TabLinksType} from "../elements/TabsLink";
import AdminLayout from "./AdminLayout";

const AdminPartsListLayout: IPage<{title: string, description: string}> =({title, description, children}) => {
    const partsLinks: TabLinksType = [
        {
            title: 'все',
            hrefName: 'admin.parts.index'
        },
        {
            title: 'Видеокарты',
            hrefName: 'admin.parts.GPU',
        },
        {
            title: 'Платформы',
            hrefName: 'admin.parts.platform'
        },
        {
            title: 'ОЗУ',
            hrefName: 'admin.parts.RAM'
        },
        {
            title: 'БП',
            hrefName: 'admin.parts.PSU'
        },
        {
            title: 'Каркас',
            hrefName: 'admin.parts.case'
        },
    ];

    return (
        <AdminLayout title={title} description={description}>
            <div className="parts-list">
                <div className="parts-list__links rounded-lg app-bg shadow-md mb-4">
                    <TabLinks links={partsLinks} small/>
                </div>

                <div className="parts-list__body">
                    {children}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminPartsListLayout;
