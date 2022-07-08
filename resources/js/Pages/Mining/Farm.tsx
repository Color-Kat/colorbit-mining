import React from 'react';
import { IPage } from "@/types/IPage";
import MiningLayout from "@components/mining/MiningLayout";
import useTypedPage from "@hooks/useTypedPage";
import {IPaginator} from "@/types/IPaginator";
import Paginator from "@components/elements/Paginator";
import {Section} from "@components/page/Section";

const rigStates = {
    on: 'Работает',
    off: 'Выключен',
    broken: 'Не исправен'
}

const RigItem: React.FC<{rig: any}> = ({rig}) => {
    const state: string = rigStates[rig.state];

    return (
        <Section>
            <div className="rigs__item w-full">
                <h2>#{rig.name}</h2>
                <div>&bull; Состояние: {}</div>
            </div>
        </Section>

    )
}

const Farm: IPage = React.memo(() => {
    const page = useTypedPage<{
        rigsPaginator: IPaginator<any>
    }>();

    const rigsPaginator = page.props.rigsPaginator;

    return (
        <MiningLayout
            title="Менеджер ригов"
            description="Запускайте и настраивайте ваши майнинг риги."
        >

            <ul className="grid sm:block grid-cols-2 gap-2">
                {rigsPaginator.data.map(rig => {
                    return (
                        <RigItem key={rig.id} rig={rig}/>
                    )
                })}
            </ul>

            {rigsPaginator.last_page !== 1 &&
                <div className="relative rounded-lg app-bg-dark shadow -m-s p-2 pt-0.5">
                    <Paginator paginator={rigsPaginator}/>
                </div>
            }
        </MiningLayout>
    );
});

export default Farm;
