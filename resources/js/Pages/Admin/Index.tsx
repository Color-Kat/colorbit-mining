import React, {ChangeEvent, memo, PropsWithChildren, useState} from "react";
import useRoute from '@hooks/useRoute';
import {IPage} from "@/types/IPage";
import Button from "@components/elements/Button";
import Input from "@components/elements/Input";
import classNames from "classnames";

import PartsIndex from "./Parts/Index";
import AdminLayout, {AdminDashboardSection} from "../../components/admin/AdminLayout";

const ChangeBalance: React.FC = () => {
    const [userId, setUserId] = useState<number>();
    const [balance, setBalance] = useState<number>();

    const changeUserIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUserId(+e.target.value);
    }

    const changeBalanceHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setBalance(+e.target.value);
    }

    return (
        // <AdminDashboardSection title="Изменить баланс">
            <div className="admin-change-balance md:max-w-md flex flex-col">
                <Input
                    className="w-full mb-2"
                    type="number"
                    placeholder="ID пользователя"
                    value={userId}
                    onChange={changeUserIdHandler}
                />
                <Input
                    className="w-full mb-2"
                    type="number"
                    placeholder="Баланс"
                    value={balance}
                    onChange={changeBalanceHandler}
                />

                <Button className="self-end">Ок</Button>
            </div>
        // </AdminDashboardSection>
    );
}

const AdminDashboard: IPage = memo(() => {
    return (
        <AdminLayout
            title="Админ панель"
            description="Тут вы можете создавать новые комплектующие, управлять другими игроками и накручивать деньги."
        >

            {/*<ChangeBalance/>*/}

            {/*<PartsIndex />*/}
        </AdminLayout>
    );
});

export default AdminDashboard;
