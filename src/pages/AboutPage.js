import React from 'react';
import About from '~/components/About';
import { Helmet } from 'react-helmet';

const { SITE_TITLE } = process.env;

export default function AboutPage() {
    return (
        <main id="about-page">
            <Helmet>
                <title>{`${SITE_TITLE} - О нас`}</title>
            </Helmet>
            <About />
        </main>
    );
}