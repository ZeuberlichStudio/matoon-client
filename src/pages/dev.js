import React from 'react';
import NewModal from 'features/new-modal';

import Categories from 'features/categories';
import { ProductItemFull } from 'features/product-item/product-item';

import Header from 'features/header';

const { API_URL } = process.env;

export default function DevPage() {

    const [height, setHeight] = React.useState(0);

    React.useEffect(() => {
      function handler() {
        const height = document.documentElement.style.getPropertyValue('--vh');
        setHeight(height);
      }

      window.addEventListener('scroll', handler)

      return () => {
        window.removeEventListener('scroll', handler)
      }
    }, []);

    return (
      <div style={{ height: '400vh' }}>
        <p style={{ position: 'fixed', top: '60px' }}>{ height }</p>
      </div>
    );
}