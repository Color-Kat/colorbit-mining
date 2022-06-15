import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

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

export const TabsLinks: React.FC<PropsWithChildren<{
    links: {title: string, href: string}[]
}>> =  React.memo(({children}) => {
    return (
        <div className="tabs-link">
            <ul className="tabs-link__head app-bg">
                <li>123</li>
                <li>123</li>
                <li>123</li>
            </ul>

            <div className="tabs-link__body">
                {children}
            </div>
        </div>

    )
});
