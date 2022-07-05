import React, {ReactNode} from "react";
import useRoute from "@hooks/useRoute";
import CLink from "../CLink";

import aside_bg from "@assets/aside_bg.png";

export const WithSidebar: React.FC<{
    asideTitle: string,
    links: {
        title: string,
        hrefName: string
    }[],
    children: ReactNode
}>
    = React.memo(({asideTitle, links, children}) => {
    const route = useRoute();
    const currentRouteName = route().current();

    return (
        <div className="flex justify-center">
            <div className="with-sidebar flex">
                <aside className="hidden md:block with-sidebar__aside rounded-lg app-bg-dark text-app shadow-md mr-4 px-5 py-5 w-72 relative overflow-hidden">

                    <h3 className="text-3xl font-play tracking-wide mb-4">{asideTitle}</h3>

                    <ul className="z-10 relative space-y-2">
                        {links.map(link => {
                            const isActive = (currentRouteName == link.hrefName);
                            return (
                                <li
                                    className={
                                        `w-full px-2 py-1.5 text-lg font-roboto rounded-md tracking-wider ${isActive ? 'app-bg-red py-2' : ''}`
                                    }
                                    key={link.hrefName}
                                >
                                    <CLink href={route(link.hrefName)} className="text-left">{link.title}</CLink>
                                </li>
                            );
                        })}
                    </ul>

                    <img src={aside_bg} className="absolute h-full object-cover opacity-25 bottom-0 left-0 pointer-events-none"/>
                    {/*<img src={aside_bg} className="absolute bottom-0 left-0 w-full opacity-25 scale-y-110 -translate-y-1"/>*/}
                </aside>

                <div className="with-sidebar__main max-w-5xl flex-1">

                    {children}
                </div>
            </div>
        </div>
    );
});
