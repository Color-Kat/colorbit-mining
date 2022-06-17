import classNames from 'classnames';
import React, {PropsWithChildren, ReactNode} from 'react';
import CLink from "../CLink";
import useRoute from "../../hooks/useRoute";

// export const TabsLink: React.FC =  React.memo(() => {
//     return (
//         <li className={
//             classNames(
//                 "font-play text-xl text-app my-1 border-gray-500",
//                 hover ? 'hover:text-gray-400' : '',
//                 (props as any).className
//             )
//         }>
//
//         </li>
//     )
// });

export type TabLinksType = {title: string, hrefName: string}[];

export const TabLinks: React.FC<{
    links: TabLinksType,
    small?: boolean
}> =  ({links, small= false}) => {
    const route = useRoute();

    return (
        <ul className="tabs-link flex rounded-lg p-1 rounded-xl w-full flex-wrap">
            {links.map(link => {
                const isActive = route().current() === link.hrefName;

                const className =  classNames(
                    'flex justify-center items-center rounded-lg font-play leading-5 m-0.5',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    small ? 'h-9 text-base' : 'h-11 text-lg',
                    isActive
                        ? 'app-bg-red shadow text-white'
                        : 'text-gray-400 bg-white/[0.08] hover:text-gray-100 hover:bg-white/[0.12]'
                )

                return (
                    <li key={link.hrefName} className={className}>
                        <CLink href={route(link.hrefName)} className="w-full h-full px-4 sm:px-5">{link.title}</CLink>
                    </li>
                )
            })}
        </ul>
    )
};