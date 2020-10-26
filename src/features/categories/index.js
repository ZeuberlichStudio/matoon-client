import React from 'react';
import CategoriesBlock from './block';

import './styles/categories.scss';

const cats = [
    {
        name: "Cat 1",
        slug: "cat-1",
        children: [
            {
                name: "Subcat 1",
                slug: "subcat-1",
                parent: "cat-1"
            },
            {
                name: "Subcat 2",
                slug: "subcat-2",
                parent: "cat-1",
                children: [
                    {
                        name: "Subcat 3",
                        slug: "subcat-3",
                        parent: "subcat-2"
                    }
                ]
            }
        ]
    },
    {
        name: "Cat 2",
        slug: "cat-2"
    },
    {
        name: "Cat 3",
        slug: "cat-3",
        children: [
            {
                name: "Subcat 4",
                slug: "subcat-4",
                parent: "cat-3",
                children: [
                    {
                        name: "Subcat 6",
                        slug: "subcat-6",
                        parent: "subcat-4"
                    }
                ]
            },
            {
                name: "Subcat 5",
                slug: "subcat-5",
                parent: "cat-3"
            }
        ]
    },
    {
        name: "Cat 4",
        slug: "cat-4"
    },
    {
        name: "Cat 5",
        slug: "cat-5"
    }
];

export default function Categories() {

    const [selection, setSelection] = React.useState([0]);

    function select(catDimension, catIndex) {
        const newSelection = [...selection.slice(0, catDimension), catIndex];
        setSelection(newSelection);
    }

    React.useEffect(() => {
        
    }, [selection]);

    const style = {
        "--dimension": selection.length - 1
    }
    
    return (
        <div id="categories" className="categories" style={style}>
            {
                selection.map((catIndex, catDimension) => { 
                    return (
                        <CategoriesBlock 
                            title={ 'sda' }
                            cats={ catDimension === 0 ? cats : catDimension === 1 ? cats[catIndex].children : catDimension === 2 ? cats[selection[1]].children[catIndex].children : null } 
                            dimension={ catDimension } 
                            {...{selection, select}}
                        />
                    );
                })
            }
        </div>
    );
}