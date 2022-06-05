import classNames from 'classnames';
import React from 'react';

export default React.memo(function Checkbox(
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
) {
  return (
    <input
      type="checkbox"
      {...props}
        className="rounded app-bg border-gray-500 text-red-600 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-0 outline-none"
      // className={classNames(
      //   ,
      //   props.className,
      // )}
    />
  );
});
