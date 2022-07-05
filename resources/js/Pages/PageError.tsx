import React from 'react';
import {IPage} from "@/types/IPage";
import {Section} from "@components/page/Section";

import errorImg from "@assets/error.png";

const PageError: IPage<{
    title: string,
    description?: string
}> = React.memo(({title, description = ''}) => {
    return (
        <div className="max-w-3xl w-full relative">
            <Section>
               <div className="flex md:flex-row flex-col justify-between">
                   <div>
                       <h1 className="text-3xl font-play tracking-wider mb-5 w-full">{title}</h1>

                       <div className="text-lg tracking-wide">{description}</div>
                   </div>

                   <img src={errorImg} className=""/>
               </div>
            </Section>
        </div>
    );
})

export default PageError;
