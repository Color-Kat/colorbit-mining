import React from "react";

interface SectionTitleProps {
    title: string;
    description: string;
}

export const SectionTitle = React.memo(({title, description}: SectionTitleProps) => {
    return (
        <div className="px-5 md:pl-7 pt-5 md:pt-10">
            <h3 className="text-3xl font-medium font-play">{title}</h3>

            <p className="mt-1 text-md text-gray-400">{description}</p>
        </div>
    );
});
