import classNames from 'classnames';
import React, {PropsWithChildren} from 'react';
import {SectionTitle} from "./SectionTitle";

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
        <div className="md:grid md:grid-cols-3 md:gap-6 rounded-lg app-bg-dark text-app shadow-md mb-4">
            <SectionTitle title={title} description={description}/>

            <div className="md:col-span-2">
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        onSubmit();
                    }}
                >
                    <div
                        className="px-4 py-5 sm:p-6"
                    >
                        <div className="grid grid-cols-6 gap-6">{children}</div>
                    </div>

                        <div
                            className="flex items-center justify-end px-4 py-3 text-right sm:px-6 border-red-600 border-t-2">
                            {renderActions?.()}
                        </div>
                </form>
            </div>
        </div>
    );
});
