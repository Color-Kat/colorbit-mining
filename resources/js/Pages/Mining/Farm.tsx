import React from 'react';
import { IPage } from "@/types/IPage";
import {Section} from "@components/page/Section";
import MiningLayout from "@components/mining/MiningLayout";
import useTypedPage from "../../hooks/useTypedPage";

const Farm: IPage = React.memo(() => {
    const page = useTypedPage<{
        rigs: any
    }>();

    console.log(page.props.rigs)
    console.log(page.props.rigs[0]['GPU'])

    return (
        <MiningLayout
            title="Менеджер ригов"
            description="Запускайте и настраивайте ваши майнинг риги."
        >
            <Section>
                Здесь может быть ваша реклама
            </Section>
        </MiningLayout>
    );
});

export default Farm;
