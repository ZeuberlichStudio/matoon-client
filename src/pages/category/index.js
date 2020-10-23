import React from 'react';
import { Route, useRouteMatch, useParams } from 'react-router-dom';

import CategoryBanner from 'features/category-banner/banner';
import Catalog from 'features/catalog/catalog';


export default function CategoryPage() {

    const params = useParams();

    return(
        <main>
            <CategoryBanner catSlug={ /*params.slug*/ 'subcat-0' }/>
            <Catalog catSlug={ /*params.slug*/ 'subcat-0' }/>
        </main>
    );
}