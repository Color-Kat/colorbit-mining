import React, {memo} from "react";
import {IPage} from "@/types/IPage";
import AdminLayout from "@components/admin/AdminLayout";

const AdminDashboard: IPage = memo(() => {
    return (
        <AdminLayout
            title="Админ панель"
            description="Тут вы можете создавать новые комплектующие, управлять другими игроками и накручивать деньги."
        >

        </AdminLayout>
    );
});

export default AdminDashboard;
