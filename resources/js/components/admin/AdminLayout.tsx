import React, {ReactNode} from "react";
import {IPage} from "@/types/IPage";
import {TabLinks, TabLinksType} from "../elements/TabsLink";
import {PageTitle} from "../page/PageTitle";

// Black background
export const AdminDashboardSection: React.FC<{children: ReactNode}>
    = ({children}) => {
    return (
        <div className="rounded-lg app-bg-dark text-app shadow-md mb-4 px-5 py-5">
            {children}
        </div>
    );
}

const AdminLayout: IPage<{title: string, description: string}> =({title, description, children}) => {
    const adminLinks: TabLinksType = [
        {
            title: 'Главная',
            hrefName: 'admin.dashboard'
        },
        {
            title: 'Комплектующие',
            hrefName: 'admin.parts.index',
            current: 'admin.parts.*'
        },
        {
            title: 'Накрутка',
            hrefName: 'admin.change-balance'
        },
    ];

    return (
        <div className="admin-dashboard max-w-3xl w-full">
            <PageTitle title={title} description={description}/>

            <div className="rounded-lg app-bg-dark shadow-md mb-4">
                <TabLinks links={adminLinks} />
            </div>

            {children && <AdminDashboardSection>
                {children}
            </AdminDashboardSection>}
        </div>
    );
};

export default AdminLayout;
