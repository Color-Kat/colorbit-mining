import classNames from 'classnames';
import React, {forwardRef} from 'react';

const Input = forwardRef<
    HTMLInputElement,
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>,HTMLInputElement>
>((props, ref) => (
    <input
        {...props}
        ref={ref}
        className={classNames(
            'app-bg border-gray-500 rounded-md focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-0 text-app',
            props.className,
        )}
    />
));

export default React.memo(Input);
