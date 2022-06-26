import React, {ReactNode} from "react";
import {Section} from "./Section";
import {Head} from "@inertiajs/inertia-react";

// Black background
export const PageTitle: React.FC<{
    title: string,
    description: string
}>
    = React.memo(({title, description}) => {
    return (
        <Section>
            <div className="max-w-xl">
                {/* @ts-ignore */}
                <Head>
                    <title>{title}</title>
                    <meta name="description" content={description} />
                </Head>
                <h2 className="text-3xl font-medium font-play">{title}</h2>
                <p className="mt-1 text-md text-gray-400">{description}</p>
            </div>
        </Section>
    );
});
