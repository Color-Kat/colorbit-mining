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
    links: TabLinksType
}> =  ({links}) => {
    const route = useRoute();

    console.log(123)

    return (
        <ul className="tabs-link app-bg flex rounded-lg h-11 p-1 space-x-1 rounded-xl">
            {links.map(link => {
                const isActive = route().current() === link.hrefName;

                const className =  classNames(
                    'w-full flex justify-center items-center rounded-lg text-lg font-play leading-5',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    isActive
                        ? 'app-bg-red shadow text-white'
                        : 'text-gray-400 hover:bg-white/[0.12] hover:text-gray-100'
                )

                return (
                    <li key={link.hrefName} className={className}>
                        <CLink href={route(link.hrefName)} className="w-full h-full">{link.title}</CLink>
                    </li>
                )
            })}
        </ul>
    )
};
