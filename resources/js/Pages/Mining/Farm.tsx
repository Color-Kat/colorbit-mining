import React, {useState} from 'react';
import {IPage} from "@/types/IPage";
import MiningLayout from "@components/mining/MiningLayout";
import useTypedPage from "@hooks/useTypedPage";
import {IPaginator} from "@/types/IPaginator";
import Paginator from "@components/elements/Paginator";
import {Section} from "@components/page/Section";
import {IRig} from "@/types/IRig";
import {BiChevronDownCircle, BiEditAlt, BiExit, BiInfoCircle, BiTerminal} from "react-icons/bi";
import {RigSlot} from "@components/mining/farm/RigSlot";
import {getColorByValue} from "@/utils/getColorByValue";
import {MiningConsole} from "@components/mining/farm/MiningConsole";
import SecondaryButton from "@components/elements/SecondaryButton";
import {EditableName} from "@components/mining/farm/EditableName";
import Button from "@components/elements/Button";
import useRoute from "@hooks/useRoute";
import {Inertia} from "@inertiajs/inertia";

const rigStates = {
    on: 'Работает',
    off: 'Выключен',
    broken: 'Не исправен'
}

const RigItem: React.FC<{ rig: IRig }> = React.memo(({rig}) => {
    const state: string = rigStates[rig.state];
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(prev => !prev)
    }

    let stateClasses = '';
    if(rig.state == 'on') stateClasses = 'text-lime-600 font-bold';
    if(rig.state == 'off') stateClasses = 'text-gray-500';
    if(rig.state == 'broken') stateClasses = 'text-red-500';

    return (
        <Section>
            <div className="rigs-list__item w-full flex flex-col">
                {/* Rig name */}
                {/*<h2 className="text-xl app-bg rounded-md p-1.5 pl-2 mb-5">#{rig.name}</h2>*/}
                <EditableName rigId={rig.id} name={rig.name} />

                {/* The rig state and info*/}
                <div className="flex justify-between items-center mb-2">
                    <div className={stateClasses}>&bull; Состояние: {state}</div>
                    <BiInfoCircle size={28} className="cursor-pointer hover:text-red-400"/>
                </div>

                {/* Params of the rig */}
                <div className="app-bg rounded-md p-2 flex flex-wrap">
                    <div className="flex flex-col justify-between mr-12">
                        <span className="text-sm text-gray-300">Температура рига</span>
                        <div
                            className={`text-base font-bold`}
                            style={{
                                color: getColorByValue(rig.general_temp)
                            }}
                        >
                            {rig.general_temp} °C
                        </div>
                    </div>

                    {rig.GPU ?
                        <div className="flex flex-col justify-between mr-12">
                            <span className="text-sm text-gray-300">Загрузка GPU</span>
                            <div
                                className="text-base font-bold"
                                style={{
                                    color: getColorByValue(rig.GPU?.temp ?? 0, 100, true)
                                }}
                            >
                                {rig.GPU.temp} °C
                            </div>
                        </div> : null
                    }

                    <div className="flex flex-col justify-between">
                        <span className="text-sm text-gray-300">Макс. потребление</span>
                        <div
                            className="text-base font-bold"
                            style={{
                                color: getColorByValue(rig.maxPower, rig.PSU?.part.PSU_power_supply ?? 400)
                            }}
                        >
                            {rig.maxPower}W
                        </div>
                    </div>
                </div>

                {/* Show/Hide parts */}
                <button className="w-full mt-6 mb-2 text-lg flex justify-end items-center text-gray-400"
                        onClick={toggleShowMore}>
                    {showMore ? 'Скрыть комплектующие' : 'Показать комплектующие'}
                    <BiChevronDownCircle size="26" className={`ml-1 transition ${showMore ? '-rotate-180' : ''}`}/>
                </button>

                {/* Slots with parts*/}
                <div
                    className={`transition-all duration-300 origin-top ${showMore ? 'scale-y-1 max-h-[100000px]' : 'scale-y-0 max-h-0 opacity-0'}`}
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
            </div>
        </Section>

    )
});

const ConsoleWindow = () => {
    const [isConsoleOpened, setConsoleOpened] = useState(false);

    return (
        <>
            <SecondaryButton
                onClick={()=>setConsoleOpened(prev => !prev)}
                className="w-full md:w-max px-5 mb-4 text-lg font-mono flex items-center"
            >
                <BiTerminal size={28} className="mr-1.5"/>
                {isConsoleOpened ? 'Закрыть' : 'Открыть'} консоль _
            </SecondaryButton>

            <div className="">
                <div
                    className={
                        `${isConsoleOpened
                            ? 'opacity-100 scale-y-100 max-h-screen mb-4'
                            : 'opacity-0 scale-y-0 max-h-0 mb-0'
                        } transition fixed lg:relative z-50 lg:z-0 w-screen lg:w-auto h-screen lg:h-96 top-0 left-0`}
                >
                    <button
                        onClick={()=>setConsoleOpened(false)}
                        className="absolute bottom-5 md:bottom-auto md:top-5 right-5"
                    ><BiExit size={45}/></button>
                    <MiningConsole/>
                </div>
            </div>
        </>
    );
}

const Farm: IPage = React.memo(() => {
    const route = useRoute();
    const page = useTypedPage<{
        rigsPaginator: IPaginator<any>
    }>();

    const rigsPaginator = page.props.rigsPaginator;

    const createNewRig = () => {
        Inertia.post(route('mining.create-new-rig'));
    }

    return (
        <MiningLayout
            title="Менеджер ригов"
            description="В менеджере ригов вы можете запускать и настраивать майнинг фермы через color-console, а также следить за их состоянием и износом."
        >
            {/* Mining Console */}
            <ConsoleWindow />

            {/* Rigs list */}
            <ul className="rigs-list mb-5 space-y-6">
                {rigsPaginator.data.map(rig => {
                    return (
                        <RigItem key={rig.id} rig={rig}/>
                    )
                })}
            </ul>

            <Section>
                <Button onClick={createNewRig}>Создать новый риг</Button>
            </Section>

            {/* Paginator */}
            {rigsPaginator.last_page !== 1 &&
                <div className="relative rounded-lg app-bg-dark shadow -m-s p-2 pt-0.5">
                    <Paginator paginator={rigsPaginator}/>
                </div>
            }
        </MiningLayout>
    );
});

export default Farm;
