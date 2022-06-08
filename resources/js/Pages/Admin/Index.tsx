import React, {ChangeEvent, memo, PropsWithChildren, useState} from "react";
import useRoute from '@hooks/useRoute';
import {IPage} from "@/types/IPage";
import AdminSection from "@components/admin/AdminSection";
import Button from "@components/elements/Button";
import Input from "@components/elements/Input";
import CLink from "@components/CLink";
import {List, ListItem} from "@components/elements/List";

const AdminDashboardSection: React.FC<PropsWithChildren<{ title: string, last?: boolean }>>
    = ({title, last = false, children}) => {
    return (
        // <div className="md:col-span-3">
        <div className={`border-red-600 ${last ? '' : 'border-b-2'} pb-7 mb-7`}>
            <h3 className="w-full text-3xl font-medium font-play mb-3">{title}</h3>
            <div>
                {children}
            </div>
        </div>
    );
}

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
        <AdminDashboardSection title="Изменить баланс">
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
        </AdminDashboardSection>
    );
}

const AdminLinks = () => {
    const route = useRoute();

    return (
        <AdminDashboardSection title="Комплектующие" last>
            <div className="admin-parts md:max-w-md">
                <List>
                    <ListItem><CLink href={route('admin.parts')}>Видеокарты</CLink></ListItem>
                    <ListItem>Процессоры</ListItem>
                    <ListItem>Платформы</ListItem>
                    <ListItem>Блоки питания</ListItem>
                    <ListItem>Каркасы</ListItem>
                </List>

                <CLink href={route('admin.parts.index')}>Видеокарта</CLink>
            </div>
        </AdminDashboardSection>
    );
}

const AdminDashboard: IPage = memo(() => {
    return (
        <AdminSection
            title="Админ панель"
            description="Тут вы можете оздавать новые комплектующие, управлять другими игроками и накручивать деньги."
        >

            <ChangeBalance/>

            <AdminLinks/>
        </AdminSection>
    );
});

export default AdminDashboard;
