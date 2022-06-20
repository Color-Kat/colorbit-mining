import React from 'react';
import Label from "./Label";

interface ControlledSelectProps {
    name: string;
    title: string;
    options: {
        title: string,
        value: string,
    }[];
    data: {
        [key: string]: any
    };
    setData: (name: string, data: any) => void;
}

export const ControlledSelect: React.FC<ControlledSelectProps> = ({name, title, options, data, setData}) => {
    return (
        <div className="control-select relative">
            <Label htmlFor={name} value={title}/>

            <span className="text-red-600 absolute right-2 top-1/2 text-xl">&#8628;</span>

            <select
                name={name}
                value={data[name]}
                onChange={(e: any) => setData(name, e.target.value)}
                className="w-full mt-1 app-bg border-gray-500 rounded-md focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-0 text-app"
            >
                {options.map((option) => (
                    <option
                        key={option.title}
                        value={option.value}
                    >{option.title}</option>
                ))}
            </select>
        </div>
    );
}
