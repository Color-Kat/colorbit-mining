import React from 'react';
import { IPage } from "@/types/IPage";
import MiningLayout from "@components/mining/MiningLayout";
import useTypedPage from "@hooks/useTypedPage";
import {IPaginator} from "@/types/IPaginator";
import Paginator from "@components/elements/Paginator";
import {Section} from "@components/page/Section";
import {IRig} from "../../types/IRig";
import {IBasePart, PartType} from "../../types/parts/IBasePart";
import useRoute from "../../hooks/useRoute";
import {Inertia} from "@inertiajs/inertia";

const RigSlot: React.FC<{part: IBasePart|null}> = React.memo(({part}) => {
    const route = useRoute();

    const toHavings = () => {
        Inertia.visit(route('mining.havings'));
    }

    if(!part) return (
        <div className="rigs__item-slot app-bg rounded-md shadow my-2 p-3">
            <button
                onClick={toHavings}
                className="app-bg-light text-app-black text-5xl font-bold w-24 h-24 rounded-md cursor-pointer"
            >+</button>
        </div>
    );

    return (
        <div className="rigs__item-slot app-bg rounded-md shadow my-2">

        </div>
    )
})

const rigStates = {
    on: 'Работает',
    off: 'Выключен',
    broken: 'Не исправен'
}

const RigItem: React.FC<{rig: IRig}> = React.memo(({rig}) => {
    const state: string = rigStates[rig.state];

    console.log(rig)

    return (
        <Section>
            <div className="rigs-list__item w-full">
                <h2>#{rig.name}</h2>
                <div className="flex justify-between">
                    <div>&bull; Состояние: {state}</div>
                    <div>?</div>
                </div>

                {/* GPU */}
                <RigSlot part={null} />

            </div>
        </Section>

    )
});

const Farm: IPage = React.memo(() => {
    const page = useTypedPage<{
        rigsPaginator: IPaginator<any>
    }>();

    const rigsPaginator = page.props.rigsPaginator;

    return (
        <MiningLayout
            title="Менеджер ригов"
            description="В менеджере ригов вы можете запускать и настраивать майнинг фермы, а также следить за их состоянием и износом."
        >

            <ul className="rigs-list mb-5 space-y-6">
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
