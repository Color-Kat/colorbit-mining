import React, {PropsWithChildren} from 'react';
import {WithSidebar} from "@components/page/WithSidebar";
import {TabLinks} from "@components/elements/TabsLink";
import {Head} from "@inertiajs/inertia-react";
import {BiArrowBack} from "react-icons/all";
import {Section} from "../page/Section";

interface Props {
    title: string;
    description: string;
}

export default React.memo(function MiningLayout({
                                                    title,
                                                    description,
                                                    children
                                                }: PropsWithChildren<Props>) {
        const asideLinks = [
            {hrefName: "mining.farm", title: "Майнинг ферма"},
            {hrefName: "mining.havings", title: "Мои комплектующие"},
            // {hrefName: "mining.havings", title: "Сломанные комплектующие"},
            // {hrefName: "mining.havings", title: "Авито"},
        ]

        const back = () => {
            window.history.back();
        }

        return (
            <WithSidebar links={asideLinks} asideTitle="Майнинг">
                {/* @ts-ignore*/}
                <Head>
                    <title>{title}</title>
                    <meta name="description" content={description}/>
                </Head>

                <Section>
                    <div className="flex items-center cursor-pointer">
                        <BiArrowBack size="30" onClick={back}/>
                        <h2 onClick={back} className="text-3xl font-medium font-play ml-3">
                            {title}
                        </h2>
                    </div>
                    <p className="mt-1 text-md text-gray-400">{description}</p>
                </Section>

                <div className="block md:hidden rounded-lg app-bg-dark shadow-md mb-4">
                    <TabLinks links={asideLinks}/>
                </div>

                <div className="max-w-3xl w-full">
                    {children}
                </div>
            </WithSidebar>
        );
    }
);
