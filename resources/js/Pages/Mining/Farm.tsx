import React from 'react';
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';
import CLink from "../../components/CLink";
import { IPage } from "../../types/IPage";
import {Head} from "@inertiajs/inertia-react";
import {BiArrowBack} from "react-icons/all";
import {Section} from "../../components/page/Section";
import {WithSidebar} from "../../components/page/WithSidebar";
import {PageTitle} from "../../components/page/PageTitle";
import {TabLinks} from "../../components/elements/TabsLink";

const Farm: IPage = React.memo(() => {
    const route = useRoute();
    const page = useTypedPage();

    const asideLinks = [
        {hrefName: "mining.farm", title: "Майнинг ферма"},
        {hrefName: "mining.havings", title: "Мои комплектующие"},
        {hrefName: "mining.havings", title: "Сломанные комплектующие"},
        {hrefName: "mining.havings", title: "Авито"},
    ]

    return (
        // <div className="good-page max-w-5xl w-full">
        //     {/* @ts-ignore*/}
        //     <Head>
        //         <title>Моя майнинг ферма</title>
        //         <meta name="description" content={``} />
        //     </Head>
        //
        //     <Section>
        //         <div className="flex items-center cursor-pointer w-max">
        //             <BiArrowBack size="30" />
        //             <h2 className="text-3xl font-medium font-play ml-3">123</h2>
        //         </div>
        //     </Section>
        //
        // </div>

        <WithSidebar links={asideLinks} asideTitle="Майнинг">
            <PageTitle title="Майнинг ферма" description="Здесь вы можете собирать майнинг фермы и управлять ими."/>

            <div className="block md:hidden rounded-lg app-bg-dark shadow-md mb-4">
                <TabLinks links={asideLinks} />
            </div>

            <Section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, perferendis, porro. Animi blanditiis cum deleniti doloribus earum labore laboriosam, nam nulla officiis quos reiciendis rerum vel! Amet at dolorem dolores eos facilis harum illo inventore nihil nobis, non obcaecati officia omnis porro praesentium provident quaerat quam quasi soluta unde veniam vero voluptates voluptatibus. Aliquid culpa debitis ducimus facere id, iusto, magni nam possimus quo rem repellat saepe sunt temporibus tenetur voluptatum. A alias aliquid amet eligendi harum nam. Adipisci aliquam atque corporis ipsam iste non nostrum quia reprehenderit ut vitae? Asperiores distinctio dolore eaque est facilis ipsum laudantium nihil pariatur?
            </Section>
        </WithSidebar>
    );
});

// Farms.layout = (page) => <AppLayout title="123" children={page} />;

export default Farm;
