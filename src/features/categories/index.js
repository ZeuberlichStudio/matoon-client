import React from 'react';
import { useSelector } from 'react-redux';
import CategoriesBlock from './block';

import './styles/categories.scss';

const { API_URL } = process.env;

export function Categories({ closeModal, closeButton, modalRef }, ref) {
    const [cats, setCats] = React.useState([]);
    const [status, setStatus] = React.useState('idle');
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        fetch(`${ API_URL }categories/tree`)
            .then( data => data.json() )
            .then( cats => {
                setCats(cats);
                setStatus('succeeded');
            })
            .catch( err => {
                setError(err);
                setStatus('failed');
            });
    }, []);

    const targetDevice = useSelector( state => state.device.target );

    const [selection, setSelection] = React.useState([0]);
    const [dimension, setDimension] = React.useState(0);
    
    React.useEffect(() => {
        setDimension(selection.length - 1);
    }, [selection]);

    function select(catDimension, catIndex) {
        const newSelection = [...selection.slice(0, catDimension), catIndex];
        setSelection(newSelection);
    }

    function goBack() {
        const newDimension = dimension - 1;
        setDimension( newDimension < 0 ? 0 : newDimension );
    }

    const style = {
        "--dimension": dimension
    }
    
    return (
        <div ref={ ref } id="categories" className="categories" style={style}>
            {
                selection.map((catIndex, catDimension) => { 
                    return (
                        <CategoriesBlock 
                            title={ 
                                catDimension === 0 ? 'Категории' : 
                                catDimension === 1 ? cats[catIndex].name : 
                                catDimension === 2 ? cats[selection[1]].children[catIndex].name :
                                ''
                            }
                            slug={
                                catDimension === 0 ? null : 
                                catDimension === 1 ? cats[catIndex].slug : 
                                catDimension === 2 ? cats[selection[1]].children[catIndex].slug :
                                ''
                            }
                            cats={ 
                                catDimension === 0 ? cats : 
                                catDimension === 1 ? cats[catIndex].children : 
                                catDimension === 2 ? cats[selection[1]].children[catIndex].children : 
                                null 
                            } 
                            dimension={ catDimension } 
                            goBack={ (targetDevice === 'mobile' && catDimension > 0) && goBack }
                            {...{selection, select, closeButton: targetDevice === 'mobile' && closeButton, closeModal}}
                        />
                    );
                })
            }
        </div>
    );
}

export default React.forwardRef(Categories);