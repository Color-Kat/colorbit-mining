import React from 'react';
import { IPage } from "@/types/IPage";
import {Section} from "@components/page/Section";
import MiningLayout from "@components/mining/MiningLayout";
import useTypedPage from "../../hooks/useTypedPage";
import {IPaginator} from "../../types/IPaginator";
import {Head} from "@inertiajs/inertia-react";
import {BiArrowBack} from "react-icons/all";
import Paginator from "../../components/elements/Paginator";

const Farm: IPage = React.memo(() => {
    const page = useTypedPage<{
        rigsPaginator: IPaginator<any>
    }>();

    const rigsPaginator = page.props.rigsPaginator;

    console.log(rigsPaginator);



    return (
        <MiningLayout
            title="Менеджер ригов"
            description="Запускайте и настраивайте ваши майнинг риги."
        >

            {/*<ul className="grid sm:block grid-cols-2 gap-2">*/}
            {/*    {partsPaginator.data.map(part => {*/}
            {/*        return (*/}
            {/*            <ShopPartItem key={part.part_id} part={part} shop={shop}/>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</ul>*/}

            {rigsPaginator.last_page !== 1 &&
                <div className="relative rounded-lg app-bg-dark shadow -m-s p-2 pt-0.5">
                    <Paginator paginator={rigsPaginator}/>
                </div>
            }
        </MiningLayout>
    );
});

export default Farm;
