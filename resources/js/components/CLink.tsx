import {InertiaLink} from '@inertiajs/inertia-react';
import React, {PropsWithChildren} from 'react';
import classNames from "classnames";

interface Props {
    href: string;
    active?: boolean;
    hover?: boolean
    disabled?: boolean
    className?: string
}

export default React.memo(
    function CLink({
                       href,
                       hover = false,
                       children,
                       disabled = false,
                       className
                   }: PropsWithChildren<Props>) {

        return (
            <InertiaLink
                href={href}
                as="button"
                disabled={disabled}
                className={
                    classNames(
                        hover ? 'text-gray-300 hover:text-gray-200' : '',
                        className
                    )
                }
            >
                {children}
            </InertiaLink>
        );
    }
);
