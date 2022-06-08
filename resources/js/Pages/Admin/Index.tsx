import React from "react";
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';
import {IPage} from "@/types/IPage";

interface Props {

}

const AdminDashboard: IPage = React.memo(() => {
    const route = useRoute();
    const page = useTypedPage();

    return (
        <div className="md:grid md:grid-cols-3 md:gap-6 rounded-lg app-bg-dark text-app shadow-md mb-4">
            <div className="px-5 md:pl-7 pt-5 md:pt-10">
                <h3 className="text-3xl font-medium font-play">Админ панель</h3>
                <p className="mt-1 text-md text-gray-400">Тут вы можете оздавать новые комплектующие, управлять другими игроками и накручивать деньги.</p>
            </div>

            <div className="px-4 py-5 sm:p-6 grid grid-cols-6 gap-6">fsdfas</div>
        </div>
    );
});

export default AdminDashboard;
