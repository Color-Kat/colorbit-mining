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

const Farm: IPage = React.memo(() => {
    const route = useRoute();
    const page = useTypedPage();

    const asideLinks = [
        {name: "mining.farm", text: "Майнинг ферма"},
        {name: "mining.havings", text: "Мои комплектующие"},
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

        <WithSidebar links={asideLinks}>
            <PageTitle title="Майнинг ферма" description="Здесь вы можете собирать майнинг фермы и управлять ими."/>
        </WithSidebar>
    );
});

// Farms.layout = (page) => <AppLayout title="123" children={page} />;

export default Farm;
