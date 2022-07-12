import {BiEditAlt} from "react-icons/bi";
import React, {useEffect, useRef, useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import useRoute from "@hooks/useRoute";
import {useForm} from "@inertiajs/inertia-react";

export const EditableName: React.FC<{ name: string, rigId: number }> = React.memo(({name, rigId}) => {
    const route = useRoute();
    const [editMode, setEditMode] = useState(false);
    // const [value, setValue] = useState('#' + name);

    const {data, setData, post, errors } = useForm({
        id: rigId,
        name: '#' + name,
    });

    // Set focus to input when switch on the edit mode
    const input = useRef(null);

    useEffect(() => {
        (input.current as any).focus();
    }, [editMode]);

    const changeModeHandle = () => {
        setEditMode(prev => !prev);

        // When edit mode is disabled, send the request to change name
        if(editMode)
            post(route('mining.change-rig-name'));
    }

    const changeHandle = (e: any) => {
        // Update name
        // '#' is always before the name
        const inputVal = e.target.value;
        setData('name', inputVal.indexOf('#') < 0 ? '#'+inputVal : inputVal);

        // If user press Enter, disable edit mode and send request
        if (e.key === 'Enter')
            changeModeHandle();
    }

    return (
        <div className="relative mb-5">
            <input
                ref={input}
                className="text-xl app-bg rounded-md p-1.5 pl-2 w-full"
                value={data.name}
                placeholder="Название рига"
                onChange={changeHandle}
                onKeyDown={changeHandle}
                disabled={!editMode}
            />
            <BiEditAlt
                onClick={changeModeHandle}
                size={24}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 hover:text-gray-400"
            />

        </div>
    );
});
