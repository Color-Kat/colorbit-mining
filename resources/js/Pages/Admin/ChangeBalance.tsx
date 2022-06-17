import React, {ChangeEvent, useState} from "react";
import {IPage} from "@/types/IPage";
import AdminLayout from "@components/admin/AdminLayout";
import Input from "../../components/elements/Input";
import Button from "../../components/elements/Button";

const ChangeBalance: IPage = React.memo(() => {
    const [userId, setUserId] = useState<number>();
    const [balance, setBalance] = useState<number>();

    const changeUserIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUserId(+e.target.value);
    }

    const changeBalanceHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setBalance(+e.target.value);
    }

    return (
        <AdminLayout title="Накрутка" description="Изменяйте баланс пользователей по их ID">
            <div className="flex justify-center">
                <div className="admin-change-balance md:max-w-md w-full flex flex-col">
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
            </div>
        </AdminLayout>
    );
});


export default ChangeBalance;
