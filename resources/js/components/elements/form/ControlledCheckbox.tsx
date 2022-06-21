import React from 'react';
import Label from "./Label";
import {IPart} from "../../../types/parts/IPart";

interface ControlledCheckboxProps {
    name: string;
    title: string;
    options: {
        title: string,
        value: string,
    }[];
    data: {
        [key: string]: any
    };
    setData: (prev: any) => any,
    onChange?: (checkedValue: string) => void | null
}

export const ControlledCheckbox: React.FC<ControlledCheckboxProps> = ({
    name,
    title,
    options,
    data,
    setData,
    onChange = null
}) => {
    // Add or delete value from list
    const handleDefault = (e: any) => {
        const checkedValue = e.target.value;

        setData((prev: any) => {
            let list = prev[name];

            let find = list.indexOf(checkedValue);

            if (find > -1) list.splice(find, 1);
            else list.push(checkedValue);

            return {
                ...prev,
                [name]: list
            }
        });
    }

    return (
        <div className="control-select relative flex flex-col space-y-1">
            <Label htmlFor={name} value={title}/>

            {options.map(option => (
                <label
                    key={option.value}
                >
                    <input
                        type="checkbox"
                        name={name}
                        value={option.value}
                        checked={data[name].includes(option.value)}
                        onChange={onChange ? () => onChange(option.value) : handleDefault}
                        className="mr-1 rounded app-bg border-gray-500 text-red-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-0 outline-none"
                    />
                    {option.title}
                </label>
            ))}

            {/*<select*/}
            {/*    name={name}*/}
            {/*    value={data[name]}*/}
            {/*    onChange={(e: any) => setData(name, e.target.value)}*/}
            {/*    className="w-full mt-1 app-bg border-gray-500 rounded-md focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-0 text-app"*/}
            {/*>*/}
            {/*    {options.map((option) => (*/}
            {/*        <option*/}
            {/*            key={option.title}*/}
            {/*            value={option.value}*/}
            {/*        >{option.title}</option>*/}
            {/*    ))}*/}
            {/*</select>*/}
        </div>
    );
}
