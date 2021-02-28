import React from 'react';
import apiCall from '~/common/api-call';
import { useSelector } from 'react-redux';
import CategoriesBlock from './block';

import './styles/categories.scss';

export function Categories({ closeModal, closeButton, modalRef }, ref) {
    const [cats, setCats] = React.useState([]);
    const [status, setStatus] = React.useState('idle');

    function fetchCatTree() {
        setStatus('pending');

        apiCall('cats/tree')
            .then(res => {
                setStatus('success');
                setCats(res.data);
            })
            .catch(err => {
                setStatus('failed');
                console.log(err)
            });
    }

    React.useEffect(fetchCatTree, []);

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
                        <CategoriesBlock key={catDimension}
                            title={ 
                                catDimension === 0 ? 'Категории' : 
                                catDimension === 1 ? cats[catIndex].name :
                                ''
                            }
                            slug={
                                catDimension === 0 ? null : 
                                catDimension === 1 ? cats[catIndex].slug :
                                ''
                            }
                            cats={ 
                                catDimension === 0 ? cats : 
                                catDimension === 1 ? cats[catIndex].subcats :
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