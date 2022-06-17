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
            hrefName: 'admin.dashboard'
        },
        // {
        //     title: 'Платформы',
        //     hrefName: 'admin.dashboard'
        // },
        // {
        //     title: 'ОЗУ',
        //     hrefName: 'admin.dashboard'
        // },
        // {
        //     title: 'БП',
        //     hrefName: 'admin.dashboard'
        // },
        // {
        //     title: 'Каркас',
        //     hrefName: 'admin.dashboard'
        // },
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
