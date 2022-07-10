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
import {BiChevronDownCircle, BiError, BiErrorCircle} from "react-icons/bi";
import {IHaving} from "../../types/IHaving";

const RigPartInfo: React.FC<{ having: IHaving<IBasePart> }> = ({having}) => {
    const part = having.part;

    // having.state = "broken";

    return (
        <>
            {/* BROKEN */}
            {(having.state === 'broken' || having.state === 'needs_repair') &&
                <div className="rigs_item-breakdowns p-2 px-3 rounded-md shadow-lg bg-zinc-900 bg-opacity-50 mb-2 md:mt-2">
                    <h5 className="text-xl font-bold flex items-center mb-1.5"><BiErrorCircle size="18" className="mr-0.5" /> Сломано</h5>

                    {having.state === "broken" &&
                        <div className="text-base text-red-500 leading-5">
                            Не работает, починить невозможно.
                            <br/>
                            <i>Личная рекомендация: выбросить.</i>
                            {/*{having.message}*/}
                        </div>
                    }

                    {having.state === "needs_repair" &&
                        <div className="text-base text-orange-500 leading-5">
                            Вентиляторы не крутятся.
                            <br/>
                            <i>Личная рекомендация: обратится к мастеру.</i>
                            {/*{having.message}*/}
                        </div>
                    }
                </div>
            }

            {/* Temp, load ... */}
            <div
                className="rigs__item-info flex flex-col sm:flex-row justify-between space-y-1 sm:space-y-0 flex-wrap md:mt-2 p-2 px-3 rounded-md shadow-lg bg-zinc-900 bg-opacity-50"
            >
                {/* Load */}
                <div className="flex flex-col justify-between">
                    <span className="text-sm text-gray-300">Загрузка</span>
                    <div
                        className={`text-base text-${100 > 70 ? 'green' : 'orange'}-500`}
                    >
                        {100}%
                    </div>
                </div>

                {/* Temperature */}
                {having.temperature &&
                    <div className="flex flex-col justify-between">
                        <span className="text-sm text-gray-300">Температура</span>
                        <div
                            className={`text-base text-${having.temperature < 70 ? 'green' : 'orange'}-500`}
                        >
                            {having.temperature} °C
                        </div>
                    </div>
                }

                {/* Temperature MAX */}
                <div className="flex flex-col justify-between">
                    <span className="text-sm text-gray-300">Макс. температура</span>
                    <div
                        className={`text-base text-${having.temperature < 70 ? 'green' : 'orange'}-500`}
                    >
                        {having.temperature + 65} °C
                    </div>
                </div>

                {/* Current Power */}
                <div className="flexflex-col justify-between">
                    <span className="text-sm text-gray-300">Потребление</span>
                    <div
                        className={`text-base text-${100 < 70 ? 'green' : 'orange'}-500`}
                    >
                        {135}W
                    </div>
                </div>
            </div>
        </>
    );
}


const RigSlot: React.FC<{ having: IHaving<IBasePart> | null, type: PartType }> = React.memo(({having, type}) => {
    const route = useRoute();

    const toHavings = () => {
        Inertia.visit(route('mining.havings.' + type));
    }

    // Empty slot with selector of the part
    if (!having) {
        return (
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
    }

    const part = having.part;

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

                    <div className="flex flex-col my-2">
                        {/* NAME */}
                        <h3 className="rigs__item-name text-base sm:text-lg md:text-xl tracking-wide font-roboto leading-5 sm:leading-6">
                            {part.name}
                        </h3>

                        <div className="hidden md:block">
                            <RigPartInfo having={having}/>
                        </div>
                    </div>
                </div>

                <div className="block md:hidden">
                    <RigPartInfo having={having}/>
                </div>

                {/* Part control */}
                <div className="rigs__item-control flex justify-end mt-3">
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
    const [showMore, setShowMore] = useState(true);

    const toggleShowMore = () => {
        setShowMore(prev => !prev)
    }

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
                <button className="self-end my-3 text-lg py-2 px-3 flex flex items-center text-gray-400"
                        onClick={toggleShowMore}>
                    {showMore ? 'Скрыть комплектующие' : 'Показать комплектующие'}
                    <BiChevronDownCircle size="26" className={`ml-1 transition ${showMore ? '-rotate-180' : ''}`}/>
                </button>

                <div
                    className={`transition-all duration-300 overflow-hidden origin-top ${showMore ? 'scale-y-1 max-h-[100000px]' : 'scale-y-0 max-h-0 opacity-0'}`}
                >
                    {/* GPU */}
                    <RigSlot having={rig.GPU} type="GPU"/>

                    {/* platform */}
                    <RigSlot having={rig.platform} type="platform"/>

                    {/* RAM */}
                    <RigSlot having={rig.RAM} type="RAM"/>

                    {/* PSU */}
                    <RigSlot having={rig.PSU} type="PSU"/>

                    {/* case */}
                    <RigSlot having={rig.case} type="case"/>
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
