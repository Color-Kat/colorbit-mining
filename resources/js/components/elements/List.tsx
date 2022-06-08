import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

export const ListItem: React.FC<PropsWithChildren<{
    hover?: boolean
}>> =  React.memo(({children, hover = false, ...props}) => {
    return (
        <li className={
            classNames(
                "font-play text-lg text-app",
                hover ? 'hover:text-gray-400' : '',
                {...props}
            )
        }>
            {children}
        </li>
    )
});

export const List: React.FC<PropsWithChildren<{}>> =  React.memo(({children}) => {
    return (
        <ul className="list-disc list-inside marker:text-red-600">
            {children}
        </ul>
    )

  // return (
  //   <button
  //     {...props}
  //     className={classNames(
  //       'inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-smx font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-500 focus:outline-none ',
  //       props.className,
  //     )}
  //   >
  //     {children}
  //   </button>
  // );
});
