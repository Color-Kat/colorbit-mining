import React from 'react';
import { IPage } from "@/types/IPage";
import {Section} from "@components/page/Section";
import MiningLayout from "@components/mining/MiningLayout";

const Farm: IPage = React.memo(() => {
    return (
        <MiningLayout title="Менеджер ригов" description="Здесь вы можете собирать риги для майнинга и управлять ими.">
            <Section>
                123213123
            </Section>
        </MiningLayout>
    );
});

export default Farm;
