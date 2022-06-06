import React, { PropsWithChildren } from 'react';

interface Props {
  value?: string;
  htmlFor?: string;
}

export default React.memo(function Label({
  value,
  htmlFor,
  children,
}: PropsWithChildren<Props>) {
  return (
    <label
      className="block font-medium font-play text-xl"
      htmlFor={htmlFor}
    >
      {value || children}
    </label>
  );
});
