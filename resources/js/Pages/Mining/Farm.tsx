import React, {useState} from 'react';
import {IPage} from "@/types/IPage";
import MiningLayout from "@components/mining/MiningLayout";
import useTypedPage from "@hooks/useTypedPage";
import {IPaginator} from "@/types/IPaginator";
import Paginator from "@components/elements/Paginator";
import {Section} from "@components/page/Section";
import {IRig} from "@/types/IRig";
import {IBasePart, PartType} from "@/types/parts/IBasePart";
import useRoute from "@hooks/useRoute";
import {Inertia} from "@inertiajs/inertia";
import {partTypeRusSingular} from "@/types/toRus";

import farm_bg from "@assets/farm_bg.png";
import Button from "../../components/elements/Button";
import {BiChevronDownCircle} from "react-icons/bi";

const RigSlot: React.FC<{ part: IBasePart | null, type: PartType }> = React.memo(({part, type}) => {
    const route = useRoute();

    const toHavings = () => {
        Inertia.visit(route('mining.havings.' + type));
    }

    if (!part) return (
        <div
            onClick={toHavings}
            className="rigs__item-slot app-bg rounded-md shadow my-2 p-3 relative even:bg-[#212121] md:hover:scale-105 transition cursor-pointer"
        >
            <div className="flex justify-between items-center z-[1] relative ">
                <button
                    onClick={toHavings}
                    className="app-bg-light text-app-black text-5xl font-bold w-20 h-20 rounded-md"
                >+
                </button>

                <h4
                    className="font-play text-3xl font-bold text-center flex-1 cursor-pointer"
                >
                    {partTypeRusSingular[type]}
                </h4>
            </div>

            <img src={farm_bg} className="w-full h-full absolute top-0 left-0 object-cover z-0 opacity-10"/>
        </div>
    );

    return (
        <div className="rigs__item-slot app-bg rounded-md shadow my-2 relative even:bg-[#212121] flex flex-col">
            {/* wrapper for larger z-index than the bg image */}
            <div className="relative z-[1] p-1.5 md:p-3 pt-3">
                <div className="rigs__item-top-info flex justify-between">
                    {/* IMAGE */}
                    <div className="rigs__item-image shrink-0 flex justify-center mb-3 mr-3 sm:mb-0">
                        <img
                            className="sm:h-36 md:h-42 sm:w-auto h-32 rounded-md "
                            src={part.image}
                            alt={part.name}
                        />
                    </div>

                    <div className="flex flex-col">
                        {/* NAME */}
                        <h3 className="rigs__item-name text-base sm:text-lg md:text-xl tracking-wide font-roboto leading-5 sm:leading-6">
                            {part.name}
                        </h3>

                        {/* INFO */}
                        <div className="rigs__item-info flex flex-col">
                            <div className="text-sm text-red-500">
                                Миша, всё сломалось!
                            </div>
                        </div>
                    </div>
                </div>

                {/* Part control */}
                <div className="rigs__item-control flex justify-end">
                    <Button className="self-end">Отключить</Button>
                </div>
            </div>

            {/* BG */}
            <img src={farm_bg} className="w-full h-full absolute top-0 left-0 object-cover z-0 opacity-10"/>
        </div>
    )
})

const rigStates = {
    on: 'Работает',
    off: 'Выключен',
    broken: 'Не исправен'
}

const RigItem: React.FC<{ rig: IRig }> = React.memo(({rig}) => {
    const state: string = rigStates[rig.state];
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {setShowMore(prev => !prev)}

    console.log(rig)

    return (
        <Section>
            <div className="rigs-list__item w-full flex flex-col">
                <h2 className="text-xl app-bg rounded-md p-1.5 pl-2 mb-5">#{rig.name}</h2>
                <div className="flex justify-between">
                    <div>&bull; Состояние: {state}</div>
                    <div>?</div>
                </div>

                {/* Show/Hide parts */}
                <button className="self-end my-3 text-lg py-2 px-3 flex flex items-center text-gray-400" onClick={toggleShowMore}>
                    {showMore ? 'Скрыть комплектующие' : 'Показать комплектующие'}
                    <BiChevronDownCircle size="26" className={`ml-1 transition ${showMore ? '-rotate-180' : ''}`}/>
                </button>

                <div className={`transition-all duration-300 overflow-hidden origin-top ${showMore ? 'scale-y-1 max-h-screen' : 'scale-y-0 max-h-0 opacity-0'}`}>
                    {/* GPU */}
                    <RigSlot part={rig.GPU} type="GPU"/>

                    {/* platform */}
                    <RigSlot part={null} type="platform"/>

                    {/* RAM */}
                    <RigSlot part={null} type="RAM"/>

                    {/* PSU */}
                    <RigSlot part={null} type="PSU"/>

                    {/* case */}
                    <RigSlot part={null} type="case"/>
                </div>

                <div className="rigs-list__item-control border-red-600 border-t mt-3 pt-3 flex justify-end">
                    <Button>Запустить</Button>
                </div>

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
