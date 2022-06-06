import {Transition} from '@headlessui/react';
import classNames from 'classnames';
import React, {PropsWithChildren, useState} from 'react';
import {InertiaLink} from "@inertiajs/inertia-react";
import CLink from "./CLink";

interface DropdownLinkProps {
    href?: string;
}

export const DropdownLink = React.memo(({
    href,
    children,
}: PropsWithChildren<DropdownLinkProps>) => {
    return (
        <CLink
            href={href || ''}
            className="block px-4 py-2 text-sm text-base leading-5 text-gray-700 hover:bg-gray-200 focus:outline-none focus:bg-gray-100 transition w-full text-left font-play"
        >
            {children}
        </CLink>
    );
});

interface DropdownProps {
    align?: string;
    width?: string | number;
    contentClasses?: string;

    renderTrigger(): JSX.Element;
}

export const Dropdown = React.memo(({
    align = 'right',
    width = '48',
    contentClasses = 'py-1 bg-white',
    renderTrigger,
    children,
}: PropsWithChildren<DropdownProps>) => {
    const [open, setOpen] = useState(false);

    // const widthClass = {
    //     '48': 'w-48',
    //     '60': 'w-60',
    // }[width.toString()];

    const alignmentClasses = (() => {
        if (align === 'left') {
            return 'origin-top-left left-0';
        } else if (align === 'right') {
            return 'origin-top-right right-0';
        } else {
            return 'origin-top';
        }
    })();

    return (
        <div className="relative">
            <div onClick={() => setOpen(!open)}>{renderTrigger()}</div>

            {/* <!-- Full Screen Dropdown Overlay --> */}
            <div
                className="fixed inset-0"
                style={{display: open ? 'block' : 'none'}}
                onClick={() => setOpen(false)}
            />

            <Transition
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div
                    className={classNames(
                        'absolute z-50 mt-2 rounded-md shadow-lg w-48 md:w-60',
                        // widthClass,
                        alignmentClasses,
                    )}
                    onClick={() => setOpen(false)}
                >
                    <div
                        className={classNames(
                            'rounded-md ring-1 ring-black ring-opacity-5 app-bg-light text-app-black font-semibold tracking-wide',
                            contentClasses,
                        )}
                    >
                        {children}
                    </div>
                </div>
            </Transition>
        </div>
    );
});
