import classNames from 'classnames';
import React, {forwardRef, InputHTMLAttributes, useCallback} from 'react';
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

export const ControlledInput: React.FC<ControlledInputProps & InputHTMLAttributes<any>> = React.memo(({
    name,
    title,
    type = 'text',
    data,
    setData,
    errors,
    ...props
}) => {
    // UseCallback breaks the business logic
    const changeHandler = (e: any) => setData(name, e.currentTarget.value)

    return (
        <div className="control-input">
            <Label htmlFor={name} value={title}/>
            <Input
                id={name}
                type={type}
                className="mt-1 block w-full"
                value={data[name]}
                onChange={changeHandler}
                {...props}
            />
            <InputError message={errors[name]} className="mt-2"/>
        </div>
    );
});
