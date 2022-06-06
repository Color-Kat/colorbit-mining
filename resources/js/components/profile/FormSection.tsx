import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

interface SectionTitleProps {
    title: string;
    description: string;
}

const SectionTitle = React.memo( ({ title, description }: SectionTitleProps) => {
    return (
        <div className="px-5 pt-5">
            <h3 className="text-3xl font-medium font-play">{title}</h3>

            <p className="mt-1 text-md text-gray-400">{description}</p>
        </div>
    );
});

interface FormSectionProps {
  title: string;
  description: string;
  renderActions?(): JSX.Element;
  onSubmit(): void;
}

export default React.memo(function FormSection({
  onSubmit,
  renderActions,
  title,
  description,
  children,
}: PropsWithChildren<FormSectionProps>) {
  const hasActions = !!renderActions;

  return (
    <div className="md:grid md:grid-cols-3 md:gap-6 rounded-lg app-bg-dark text-app">
      <SectionTitle title={title} description={description} />

      <div className="md:col-span-2">
        <form
          onSubmit={e => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div
            className={classNames(
              'px-4 py-5 sm:p-6',
              hasActions
                ? 'sm:rounded-tl-md sm:rounded-tr-md'
                : 'sm:rounded-md',
            )}
          >
            <div className="grid grid-cols-6 gap-6">{children}</div>
          </div>

          {hasActions && (
            <div className="flex items-center justify-end px-4 py-3 text-right sm:px-6 border-red-600 border-t-2">
              {renderActions?.()}
            </div>
          )}
        </form>
      </div>
    </div>
  );
});
