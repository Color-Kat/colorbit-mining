import React, {PropsWithChildren, ReactNode} from "react";
import {IPage} from "@/types/IPage";
import {TabLinks, TabLinksType} from "../elements/TabsLink";
import useRoute from "../../hooks/useRoute";

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
            hrefName: 'admin.parts.index'
        },
        {
            title: 'Накрутка',
            hrefName: 'admin.change-balance'
        },
    ];

    return (
        <div className="admin-dashboard max-w-3xl w-full">
            <AdminDashboardSection>
                <div className="max-w-xl">
                    <h2 className="text-3xl font-medium font-play">{title}</h2>
                    <p className="mt-1 text-md text-gray-400">{description}</p>
                </div>
            </AdminDashboardSection>

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
