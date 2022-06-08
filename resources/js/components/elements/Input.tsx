import classNames from 'classnames';
import React, {forwardRef, InputHTMLAttributes} from 'react';

const Input: React.FC<InputHTMLAttributes<any>> = ((props) => (
    <input
        {...props}
        className={classNames(
            'app-bg border-gray-500 rounded-md focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-0 text-app',
            props.className,
        )}
    />
));

export default React.memo(Input);
