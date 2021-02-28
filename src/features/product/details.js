import React from 'react';

import { Tabs, Tab } from '~/features/tabs/tabs';

import './styles/details.scss';

export default function ProductDetails({ desc, specs, sku, stock }) {

    const renderSpec = (spec, i) => {
        const [specName, specValue] = spec;

        return (
            <li key={ i }>
                <span>{ specName }</span>
                <span>{ specValue }</span>
            </li>
        );
    }

    return (
        <div className="product-details">
            <span className="product-details_sku">Арт: { sku }</span>
            <span className="product-details_stock">В наличии: { stock } шт.</span>

            <Tabs className="product-details_more">
                <Tab title="Описание">
                    <p>{ desc }</p>
                </Tab>
                <Tab title="Характеристики">
                    <ul>{ specs.map( renderSpec ) }</ul>
                </Tab>
            </Tabs>
        </div>
    );
}