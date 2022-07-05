import React from 'react';
import {EditButton} from "./EditButton";
import {DeleteButton} from "./DeleteButton";
import {IBasePart} from "../../types/parts/IBasePart";
import {partTypeRus} from "../../types/toRus";
import {Inertia} from "@inertiajs/inertia";
import useRoute from "../../hooks/useRoute";

const no_image = 'data:image/jpeg;base64,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';

const PartsListItem: React.FC<{ part: IBasePart }> = ({part}) => {
    const route = useRoute();
    const image = part.image || no_image;

    const openPart = () => {
        // console.log('open');
    }

    const editPart = () => {
        console.log()
        Inertia.get(route('admin.parts.edit', part.id));
    }

    const deletePart = () => {
        Inertia.delete(route('admin.parts.destroy', part.id));
    }

    return (
        <li key={part.id} className="parts-list__item flex app-bg rounded-lg p-3 flex-col md:flex-row">
            {/* IMAGE */}
            <div className="parts-list__image md:block flex justify-center mb-3 md:mb-0 cursor-pointer" onClick={openPart}>
                <img
                    className="h-48 w-48 md:h-32 md:w-32 object-cover rounded-md"
                    src={image}
                    alt=""/>
            </div>

            <div className="parts-list__info text-right flex-1 flex flex-col">
                {/* NAME */}
                <div className="text-xl font-play flex-col flex mb-2">
                    <h3 className="cursor-pointer" onClick={openPart}>
                        {/*<span className="text-2xl text-gray-500">{part.vendor}: </span>*/}
                        {part.name}
                    </h3>

                    <div className="text-sm text-gray-400">Тип: {partTypeRus[part.type]}</div>
                </div>

                {/* PRICE */}
                <div className="parts-list__specifications flex-1">
                    <div className="text-xl font-play">{part.price}$</div>
                </div>

                {/* CONTROL BUTTONS */}
                <div className="parts-list__control space-y-2 space-x-2 mt-2">
                    {/*<ViewButton onClick={openPart}/>*/}
                    <EditButton onClick={editPart}/>
                    <DeleteButton onClick={deletePart}/>
                </div>
            </div>
        </li>
    );
}

export const PartsList: React.FC<{ parts: IBasePart[] }> = React.memo(({parts}) => {
    return (
        <ul className="mb-5 space-y-6">
            {parts.map(part => (<PartsListItem part={part} key={part.id}/>))}
        </ul>
    );
});
