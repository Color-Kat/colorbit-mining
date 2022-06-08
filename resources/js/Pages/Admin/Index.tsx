import React, {memo, PropsWithChildren, useState} from "react";
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';
import {IPage} from "@/types/IPage";
import AdminSection from "../../components/admin/AdminSection";
import Button from "../../components/elements/Button";
import Input from "../../components/elements/Input";

const AdminDashboardSection: React.FC<PropsWithChildren<{title: string}>>
    = memo(({title, children}) => {
    return (
        <div className="">
            <h3 className="w-full text-3xl font-medium font-play mb-3">{title}</h3>
            <div>
                {children}
            </div>
        </div>
    );
});

const ChangeBalance: React.FC = () => {
    const [userId, setUserId] = useState(0);
    const [balance, setBalance] = useState(0);

    const changeUserIdHandler = () => {

    }

    const changeBalanceHandler = () => {

    }

    return (
        <div className="change-balance md:flex">
            <Input type="number" placeholder="ID пользователя" value={userId} onChange={changeUserIdHandler}/>
            <Input type="number" placeholder="Баланс" value={balance} onChange={changeBalanceHandler}/>

            <Button>Ок</Button>
        </div>
    );
}

const AdminDashboard: IPage = memo(() => {
    const route = useRoute();

    return (
        <AdminSection
            title="Админ панель"
            description="Тут вы можете оздавать новые комплектующие, управлять другими игроками и накручивать деньги."
        >
            <AdminDashboardSection title="Изменить баланс">
                <ChangeBalance/>
            </AdminDashboardSection>
        </AdminSection>
    );
});

export default AdminDashboard;
