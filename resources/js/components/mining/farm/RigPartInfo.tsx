import React, {useCallback, useMemo} from "react";
import {IHaving} from "@/types/IHaving";
import {BiErrorCircle} from "react-icons/bi";
import {IBasePart} from "@/types/parts/IBasePart";
import {getColorByValue} from "../../../utils/getColorByValue";

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
    const color = setColor ? getColorByValue(intValue, 100, inverseColor) : '';

    return (
        <div className="flex flex-col justify-between">
            <span className="text-sm text-gray-300">{title}</span>
            <div
                className="text-base font-bold"
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
            <div className="rigs_item-breakdowns p-2 px-3 rounded-md shadow-lg bg-zinc-900 bg-opacity-50 mb-2 md:mt-3">
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
                className="rigs__item-info flex flex-col sm:flex-row justify-between space-y-1 sm:space-y-0 flex-wrap md:mt-3 p-2 px-3 rounded-md shadow-lg bg-zinc-900 bg-opacity-50"
            >
                {/* Load */}
                {having.loading !== null ?
                    <RigPartInfoItem
                        title="Загрузка"
                        value={having.loading + '%'}
                        inverseColor={part.type === 'GPU'}
                    /> : null
                }

                {/* Temperature */}
                {having.temp !== null ?
                    <RigPartInfoItem
                        title="Температура"
                        value={having.temp + ' °C'}
                    /> : null
                }

                {/* Temperature MAX */}
                {having.max_temp !== null ?
                    <RigPartInfoItem
                        title="Макс. температура"
                        value={having.max_temp + ' °C'
                        }/> : null
                }

                {/* Current Power */}
                {having.current_power !== null ?
                    <RigPartInfoItem
                        title="Потребление"
                        value={having.current_power + 'W'}
                        setColor={false}
                    /> : null
                }
            </div>
        </>
    );
}
