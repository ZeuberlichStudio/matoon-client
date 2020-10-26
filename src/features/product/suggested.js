import React from 'react';
import { useSelector } from 'react-redux';

import './styles/suggested.scss';
import Slider from 'features/slider/slider';
import Scrollable from 'features/containers/scrollable';
import { ProductItemSuggested as SuggestedItem } from 'features/product-item/product-item';

export default function Suggested() {

    const { API_URL } = process.env;

    const targetDevice = useSelector( state => state.device.target );

    const [data, setData] = React.useState([]);
    const [status, setStatus] = React.useState('idle');
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        fetch(API_URL + `products`)
        .then( data => data.json() )
        .then( result => {
            setData(result);
            setStatus('succeeded');
        })
        .catch( err => {
            setError(err);
            setStatus('failed');
        });
    }, []);

    return (
        <div className="suggested product-suggested">
            <h3>Похожие товары</h3>
            {
                targetDevice === 'desktop' ?
                <Slider id="suggested_slider">
                    <div className="suggested_group">{ data.slice(0,2).map( (item, i) => <SuggestedItem data={ item } i={ i }/> ) }</div>
                    <div className="suggested_group">{ data.slice(2,4).map( (item, i) => <SuggestedItem data={ item } i={ i }/> ) }</div>
                    <div className="suggested_group"> { data.slice(4,6).map( (item, i) => <SuggestedItem data={ item } i={ i }/> ) }</div>
                </Slider> :
                targetDevice === 'tablet' ?
                <Slider id="suggested_slider">
                    <div className="suggested_group">{ data.slice(0,3).map( (item, i) => <SuggestedItem data={ item } i={ i }/> ) }</div>
                    <div className="suggested_group">{ data.slice(3,6).map( (item, i) => <SuggestedItem data={ item } i={ i }/> ) }</div>
                </Slider> :
                <Scrollable>
                    { data.map( (item, i) => <SuggestedItem data={ item } i={ i }/> ) }
                </Scrollable>
            }
        </div>
    );
}