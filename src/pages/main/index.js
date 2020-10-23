import React from 'react';

import CategoryBanner from 'features/category-banner/banner';
import Feed from 'features/feed';

//
const posts = [
    {
        title: "Вот тут реально длинное название для поста",
        content: "Портмоне торговой марки Tom Ford из натуральной кожи. Портмоне с клапаном на кнопке.",
        link: "/product=product-0"
    },
    {
        title: "Скидка 85%",
        content: "Портмоне торговой марки Tom Ford из натуральной кожи. Портмоне с клапаном на кнопке.",
        link: "/product=product-1"
    },
    {
        title: "Название поста",
        content: "Портмоне торговой марки Tom Ford из натуральной кожи. Портмоне с клапаном на кнопке.",
        link: "/product=product-2"
    }
]
//

export default function MainPage() {
    return (
        <main id="title-page" className="title-page">
            <CategoryBanner catSlug='subcat-0'/>
            <Feed/>
        </main>
    );
}