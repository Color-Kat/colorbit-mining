import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default React.memo(function SecondaryButton({
  children,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <button
      {...props}
      className={classNames(
        'inline-flex items-center px-4 py-2 rounded-smx font-semibold text-xs uppercase tracking-widest focus:outline-none app-bg-light hover:bg-gray-200 text-app-black',
        props.className,
      )}
    >
      {children}
    </button>
  );
})
