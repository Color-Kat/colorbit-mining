import React, {memo, PropsWithChildren} from 'react';
import {IPaginator} from "../../types/IPaginator";
import CLink from "../CLink";
import classNames from "classnames";

const Pagination: React.FC<{ paginator: IPaginator<any> }> = memo(({paginator}) => {
    if (paginator.last_page === 1) return null;

    return (
        <nav className="mt-3 flex justify-end">
            <ul className="inline-flex -space-x-px h-11 app-bg rounded-md shadow overflow-hidden">
                {paginator.links.map((link, i) => {
                    const isDisabled = link.url === null;
                    const isActive = link.active;

                    const classes = classNames(
                        'p-2 md:py-2 md:px-3 leading-tight h-11 w-11',
                        isActive ? 'app-bg-red text-gray-100 shadow' : 'hover:bg-neutral-600',
                        isDisabled ? 'bg-neutral-600/[0.5]' : ''
                    );

                    return (
                        <li key={i}>
                            <CLink
                                href={link.url}
                                className={classes}
                                disabled={isDisabled}
                            >
                                <span dangerouslySetInnerHTML={{__html: link.label}}/>
                            </CLink>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
});

export default Pagination;
