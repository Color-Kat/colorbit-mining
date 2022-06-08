import {InertiaLink} from '@inertiajs/inertia-react';
import React, {PropsWithChildren} from 'react';
import classNames from "classnames";

interface Props {
    href: string;
    active?: boolean;
    hover?: boolean
    className?: string
}

export default React.memo(
    function CLink({
                       href,
                       hover = false,
                       children,
                       className
                   }: PropsWithChildren<Props>) {
        // const classes = active
        //     ? 'inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition'
        //     : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition';

        return (
            <InertiaLink href={href} className={
                classNames(
                    hover ? 'text-gray-300 hover:text-gray-200' : '',
                    className
                )
            } as="button">
                {children}
            </InertiaLink>
        );
    }
);
