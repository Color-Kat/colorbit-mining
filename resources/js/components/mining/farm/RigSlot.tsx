import React from "react";
import {IHaving} from "@/types/IHaving";
import {Inertia} from "@inertiajs/inertia";
import SecondaryButton from "@components/elements/SecondaryButton";
import {IBasePart, PartType} from "@/types/parts/IBasePart";
import useRoute from "@hooks/useRoute";
import {partTypeRusSingular} from "@/types/toRus";
import {RigPartInfo} from "./RigPartInfo";
import farm_bg from "@assets/farm_bg.png";


export const RigSlot: React.FC<{
    having: IHaving<IBasePart> | null,
    type: PartType
}> = React.memo(({having, type}) => {
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

                        {having.message && <span className="mt-2 mb-1 text-red-500 text-lg font-mono">{having.message}</span>}

                        {/* Info on desktop */}
                        <div className="hidden md:block">
                            <RigPartInfo having={having}/>
                        </div>
                    </div>
                </div>

                {/* Info on mobile */}
                <div className="block md:hidden">
                    <RigPartInfo having={having}/>
                </div>

                {/* Part control */}
                <div className="rigs__item-control flex justify-end mt-3">
                    <SecondaryButton className="self-end">Отключить</SecondaryButton>
                </div>
            </div>

            {/* BG */}
            <img src={farm_bg} className="w-full h-full absolute top-0 left-0 object-cover z-0 opacity-10"/>
        </div>
    )
});
