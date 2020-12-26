import React from 'react';
import { useSelector } from 'react-redux';

import './styles/suggested.scss';
import Slider from 'features/slider/slider';
import Scrollable from 'features/containers/scrollable';
import { ProductItemSuggested as SuggestedItem } from 'features/product-item';
import { SpinningLoader as Loader } from 'features/loader';

export default function Suggested({ cat, materials, exclude }) {

    const { API_URL } = process.env;

    const targetDevice = useSelector( state => state.device.target );

    const [data, setData] = React.useState([]);
    const [status, setStatus] = React.useState('idle');
    const [error, setError] = React.useState(null);

    function fetchSuggested() {
        setStatus('loading');

        function generateQuery() {
            const materialQuery = materials.reduce((acc, next) => `${acc}${next},`, '&material='),
            catQuery = `&cat=${cat}`,
            limitQuery = `&limit=6`,
            excQuery = `&exc=${exclude}`,
            query = materialQuery + catQuery + limitQuery + excQuery;
            console.log(query)
            return query;
        }
        
        fetch(API_URL + `products?${generateQuery()}`)
        .then(data => data.json())
        .then(result => {
            setData(result);
            setStatus('success');
        })
        .catch(err => {
            setError(err);
            setStatus('failed');
        });
    }

    React.useEffect(() => fetchSuggested(), []);

    return (
        <div className="suggested product-suggested">
            <h3>Похожие товары</h3>
            <div className="suggested_items">
                {
                    status === 'success' ?
                    (
                        targetDevice === 'desktop' ?
                        <Slider id="suggested_slider">
                            <div className="suggested_group">{ 
                                data.rows.slice(0,2).map( (item, i) => <SuggestedItem data={ item } i={ i }/> ) }
                            </div>
                            <div className="suggested_group">{ 
                                data.rows.slice(2,4).map( (item, i) => <SuggestedItem data={ item } i={ i }/> ) }
                            </div>
                            <div className="suggested_group">{ 
                                data.rows.slice(4,6).map( (item, i) => <SuggestedItem data={ item } i={ i }/> ) }
                            </div>
                        </Slider> :
                        targetDevice === 'tablet' ?
                        <Slider id="suggested_slider">
                            <div className="suggested_group">
                                { data.rows.slice(0,3).map( (item, i) => <SuggestedItem data={ item } i={ i }/> ) }
                            </div>
                            <div className="suggested_group">
                                { data.rows.slice(3,6).map( (item, i) => <SuggestedItem data={ item } i={ i }/> ) }
                            </div>
                        </Slider> :
                        <Scrollable>
                            { data.rows.map( (item, i) => <SuggestedItem data={ item } i={ i }/> ) }
                        </Scrollable>
                    ) :
                    <Loader/>
                }
            </div>
        </div>
    );
}