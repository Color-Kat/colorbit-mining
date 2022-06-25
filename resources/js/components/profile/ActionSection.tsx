import React, { PropsWithChildren } from 'react';
import {SectionTitle} from "./SectionTitle";

interface Props {
  title: string;
  description: string;
}

export default React.memo(function ActionSection({
  title,
  description,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="md:grid md:grid-cols-3 md:gap-6 rounded-lg app-bg-dark text-app shadow-md mb-4">
      <SectionTitle title={title} description={description} />

      <div className="md:col-span-2 px-4 py-5 sm:p-6">
        <div className="px-4 py-5 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
});
