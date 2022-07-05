import React from 'react';
import { IPage } from "@/types/IPage";
import {Section} from "@components/page/Section";
import MiningLayout from "@components/mining/MiningLayout";
import useTypedPage from "../../hooks/useTypedPage";
import {IPaginator} from "../../types/IPaginator";

const Havings: IPage = React.memo(() => {
    const page = useTypedPage<{
        havings: IPaginator<any>
    }>();

    const havingsPaginator = page.props.havings;

    console.log(havingsPaginator);

    return (
        <MiningLayout title="Ваши комплектующие" description="Распоряжайтесь купленными вами комплектующими: собирайте из них майнинг фермы, продавайте на б/у рынке.">
            <Section>
                123213123
            </Section>
        </MiningLayout>
    );
});

export default Havings;
