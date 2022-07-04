import React, {ReactNode} from "react";
import useRoute from "@hooks/useRoute";
import CLink from "../CLink";

import aside_bg from "@assets/aside_bg.png";

export const WithSidebar: React.FC<{
    links: {
        name: string,
        text: string
    }[],
    children: ReactNode
}>
    = React.memo(({links, children}) => {
    const route = useRoute();

    return (
        <div className="with-sidebar w-full flex">

            <aside className="with-sidebar__aside rounded-lg app-bg-dark text-app shadow-md mr-4 px-5 py-5 w-72 relative overflow-hidden">
                <h3>Майнинг</h3>

                <ul>
                    {links.map(link => {
                        return (
                            <li
                                key="link.name"
                            >
                                <CLink href={route(link.name)}>{link.text}</CLink>
                            </li>
                        );
                    })}
                </ul>

                {/*<img src={aside_bg} className="absolute bottom-0 left-0 w-full opacity-25 scale-y-110 -translate-y-1"/>*/}
                <img src={aside_bg} className="absolute h-full object-cover opacity-25 bottom-0 left-0"/>
            </aside>

            <div className="with-sidebar__main max-w-5xl flex-1">
                {children}
            </div>

        </div>
    );
});
