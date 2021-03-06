import React, {ChangeEvent, useState} from "react";
import {IPage} from "@/types/IPage";
import AdminLayout from "@components/admin/AdminLayout";
import Input from "@components/elements/form/Input";
import Button from "@components/elements/Button";
import Label from "../../components/elements/form/Label";
import useRoute from "../../hooks/useRoute";
import {Inertia} from "@inertiajs/inertia";

const ChangeBalance: IPage = React.memo(() => {
    const route = useRoute();
    const [userId, setUserId] = useState<number>(1);
    const [balance, setBalance] = useState<number>(1000);

    const changeUserIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUserId(+e.target.value);
    }

    const changeBalanceHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setBalance(+e.target.value);
    }

    const send = async () => {
        Inertia.post(route('admin.change-balance', {
            userId,
            balance
        }))

    }

    return (
        <AdminLayout title="Накрутка" description="Изменяйте баланс пользователей по их ID">
            <div className="flex justify-center">
                <div className="admin-change-balance md:max-w-md w-full flex flex-col">
                    <Label htmlFor="user_id">ID пользователя</Label>
                    <Input
                        id="user_id"
                        className="w-full mb-2"
                        type="number"
                        placeholder="ID пользователя"
                        value={userId}
                        onChange={changeUserIdHandler}
                    />
                    <Label htmlFor="money">Кол-во $$$</Label>
                    <Input
                        id="money"
                        className="w-full mb-2"
                        type="number"
                        placeholder="Баланс"
                        value={balance}
                        onChange={changeBalanceHandler}
                    />

                    <Button className="self-end" onClick={send}>Ок</Button>
                </div>
            </div>
        </AdminLayout>
    );
});


export default ChangeBalance;
