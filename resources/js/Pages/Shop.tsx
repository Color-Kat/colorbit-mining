import React from 'react';
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';
import {IPage} from "../types/IPage";
import {PageTitle} from "../components/page/PageTitle";
import Paginator from "../components/elements/Paginator";

const Shop: IPage = React.memo(() => {
    const route = useRoute();
    const page = useTypedPage();

    const shop = page.props.shop;
    // const part = page.props.shop;
    console.log(page.props);

    return (
        <div className="shops-list-page max-w-3xl w-full">
            <PageTitle title={shop.name} description={shop.description}/>



            <div className="relative rounded-lg app-bg-dark shadow -m-s p-2 pt-0.5">
                {/*<Paginator paginator={shopsListPaginator}/>*/}
            </div>
        </div>
    );
});

export default Shop;
