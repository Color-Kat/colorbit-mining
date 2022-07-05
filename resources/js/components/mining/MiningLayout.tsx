import React, {PropsWithChildren} from 'react';
import {WithSidebar} from "@components/page/WithSidebar";
import {PageTitle} from "@components/page/PageTitle";
import {TabLinks} from "@components/elements/TabsLink";

interface Props {
    title: string;
    description: string;
}

export default React.memo(
    function CLink({
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

        return (
            <WithSidebar links={asideLinks} asideTitle="Майнинг">
                <PageTitle title={title} description={description}/>

                <div className="block md:hidden rounded-lg app-bg-dark shadow-md mb-4">
                    <TabLinks links={asideLinks}/>
                </div>

                {children}
            </WithSidebar>
        );
    }
);
