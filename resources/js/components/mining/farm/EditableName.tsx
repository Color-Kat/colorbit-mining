import {BiEditAlt} from "react-icons/bi";
import React, {useEffect, useRef, useState} from "react";

export const EditableName: React.FC<{ name: string }> = React.memo(({name}) => {
    const [editMode, setEditMode] = useState(false);
    const [value, setValue] = useState('#' + name);

    // Set focus to input when switch on the edit mode
    const input = useRef(null);

    useEffect(() => {
        (input.current as any).focus();
    }, [editMode]);

    const changeHandle = (e: any) => {
        // Update name
        // '#' is always before name
        const inputVal = e.target.value;
        setValue(inputVal.indexOf('#') < 0 ? '#'+inputVal : inputVal);
    }

    return (
        <div className="relative mb-5">
            <input
                ref={input}
                className="text-xl app-bg rounded-md p-1.5 pl-2 w-full"
                value={value}
                placeholder="Название рига"
                onChange={changeHandle}
                disabled={!editMode}
            />
            <BiEditAlt
                onClick={() => setEditMode(prev => !prev)}
                size={24}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 hover:text-gray-400"
            />

        </div>
    );
});
