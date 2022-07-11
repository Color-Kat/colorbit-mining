import React from "react";
import {IHaving} from "@/types/IHaving";
import {BiErrorCircle} from "react-icons/bi";
import {IBasePart} from "@/types/parts/IBasePart";

const RigPartInfoItem: React.FC<{
    title: string,
    value: any,
    setColor?: boolean,
    inverseColor?: boolean
}> = ({
    title,
    value,
    setColor = true,
    inverseColor = false
}) => {
    let intValue = parseInt(value); // Get int value

    // For some parts we can inverse colors
    // 100% - green; 0% - red
    if (inverseColor) intValue = 100 - intValue;

    // Adn define color of text info
    // If setColor is true
    let color = '';
    if (setColor) {
        color = '#65a30d';
        if (intValue > 25) color = '#16a34a';
        if (intValue > 50) color = '#facc15';
        if (intValue > 75) color = '#ea580c';
        if (intValue > 90) color = '#dc2626';
    }

    return (
        <div className="flex flex-col justify-between">
            <span className="text-sm text-gray-300">{title}</span>
            <div
                className={`text-base`}
                style={{
                    color: color
                }}
            >
                {value}
            </div>
        </div>
    );
}

export const RigPartInfo: React.FC<{ having: IHaving<IBasePart> }> = ({having}) => {
    const part = having.part;

    // having.state = "broken";
    return (
        <>
            {/* BROKEN */}
            {(having.state === 'broken' || having.state === 'needs_repair') &&
            <div className="rigs_item-breakdowns p-2 px-3 rounded-md shadow-lg bg-zinc-900 bg-opacity-50 mb-2 md:mt-2">
                <h5 className="text-xl font-bold flex items-center mb-1.5">
                    <BiErrorCircle size="18" className="mr-0.5"/> Сломано
                </h5>

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
                {having.loading !== null ?
                    <RigPartInfoItem
                        title="Загрузка"
                        value={having.loading + '%'}
                        inverseColor={part.type === 'GPU'}
                    /> : null
                }

                {having.temp !== null ?
                    <RigPartInfoItem
                        title="Температура"
                        value={having.temp + ' °C'}
                    /> : null
                }

                {having.max_temp !== null ?
                    <RigPartInfoItem
                        title="Макс. температура"
                        value={having.max_temp + ' °C'
                        }/> : null
                }

                {having.current_power !== null ?
                    <RigPartInfoItem
                        title="Потребление"
                        value={having.current_power + 'W'}
                        setColor={false}
                    /> : null
                }

                {/*{having.loading !== null ?*/}
                {/*    <div className="flex flex-col justify-between">*/}
                {/*        <span className="text-sm text-gray-300">Загрузка</span>*/}
                {/*        <div*/}
                {/*            className={`text-base text-${having.loading > 70 ? 'green' : 'orange'}-500`}*/}
                {/*        >*/}
                {/*            {having.loading}%*/}
                {/*        </div>*/}
                {/*    </div> : null*/}
                {/*}*/}

                {/* Temperature */}
                {/*{having.temp !== null ?*/}
                {/*    <div className="flex flex-col justify-between">*/}
                {/*        <span className="text-sm text-gray-300">Температура</span>*/}
                {/*        <div*/}
                {/*            className={`text-base text-${having.temp < 70 ? 'green' : 'orange'}-500`}*/}
                {/*        >*/}
                {/*            {having.temp} °C*/}
                {/*        </div>*/}
                {/*    </div> : null*/}
                {/*}*/}

                {/* Temperature MAX */}
                {/*{having.max_temp !== null ?*/}
                {/*    <div className="flex flex-col justify-between">*/}
                {/*        <span className="text-sm text-gray-300">Макс. температура</span>*/}
                {/*        <div*/}
                {/*            className={`text-base text-${having.max_temp < 70 ? 'green' : 'orange'}-500`}*/}
                {/*        >*/}
                {/*            {having.max_temp} °C*/}
                {/*        </div>*/}
                {/*    </div> : null*/}
                {/*}*/}

                {/* Current Power */}
                {/*{having.current_power !== null ?*/}
                {/*    <div className="flex flex-col justify-between">*/}
                {/*        <span className="text-sm text-gray-300">Потребление</span>*/}
                {/*        <div*/}
                {/*            className={`text-base text-${having.current_power < 70 ? 'green' : 'orange'}-500`}*/}
                {/*        >*/}
                {/*            {having.current_power}W*/}
                {/*        </div>*/}
                {/*    </div> : null*/}
                {/*}*/}
            </div>
        </>
    );
}
