import React from 'react';
import { useParams } from 'react-router';

import CatalogControls from '~/components/CatalogControls';

export default function CategoryPage() {
    const { slug } = useParams();

    return (
        <main id="category_page">
            <CatalogControls/>
        </main>
    );
}
