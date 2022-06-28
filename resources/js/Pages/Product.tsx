import React from 'react';
import useRoute from '@hooks/useRoute';
import useTypedPage from '@hooks/useTypedPage';
import {IPage} from "../types/IPage";

interface Props {

}

const Product: IPage = React.memo(() => {
    const route = useRoute();
    const page = useTypedPage();

    console.log(page)

    return (
        <>

            <span>Product page</span>

        </>
    );
});

export default Product;
