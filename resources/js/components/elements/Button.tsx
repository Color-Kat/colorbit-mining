import classNames from 'classnames';
import React, {PropsWithChildren} from 'react';

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>;

export default React.memo(function Button({
      children,
      ...props
}: PropsWithChildren<Props>) {
    return (
        <button
            {...props}
            className={classNames(
                'inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-smx font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-500 focus:outline-none ',
                props.className,
            )}
        >
            {children}
        </button>
    );
})
