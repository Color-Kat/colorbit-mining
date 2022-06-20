import classNames from 'classnames';
import React, {forwardRef, InputHTMLAttributes} from 'react';
import Input from "./Input";
import InputError from "./InputError";
import Label from "./Label";

interface ControlledInputProps {
    title: string;
    name: string;
    type?: string;
    data: {
        [key: string]: any
    };
    setData: (name: string, data: any) => void;
    errors: { [key: string]: string };
}

export const ControlledInput: React.FC<ControlledInputProps> = ({
    name,
    title,
    type = 'text',
    data,
    setData,
    errors
}) => {
    return (
        <div className="control-input">
            <Label htmlFor={name} value={title}/>
            <Input
                id={name}
                type={type}
                className="mt-1 block w-full"
                value={data[name]}
                onChange={e => setData(name, e.currentTarget.value)}
            />
            <InputError message={errors[name]} className="mt-2"/>
        </div>
    );
};
