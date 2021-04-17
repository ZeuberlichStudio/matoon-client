import React from 'react';
import { useSelector } from 'react-redux';
import apiCall from '~/common/api-call';

import './styles/suggested.scss';
import Slider from '~/features/slider/slider';
import Scrollable from '~/features/containers/scrollable';
import { ProductItemSuggested as SuggestedItem } from '~/features/product-item';
import { SpinningLoader as Loader } from '~/features/loader';

export default function Suggested({ cat, materials, exclude }) {
    const targetDevice = useSelector( state => state.device.target );

    const [data, setData] = React.useState([]);
    const [totalCount, setTotalCount] = React.useState(null);
    const [status, setStatus] = React.useState('idle');

    function fetchSuggested() {
        setStatus('loading');

        function generateQuery() {
            const materialQuery = materials.reduce((acc, next) => `${acc}${next},`, '&material='),
            catQuery = `&cat=${cat}`,
            limitQuery = `&limit=6`,
            excQuery = `&exc=${exclude}`,
            query = materialQuery + catQuery + limitQuery + excQuery;

            return query;
        }
        
        apiCall(`products?${generateQuery()}`)
            .then(({headers, data}) => {
                setData(data);
                setTotalCount(headers['x-total-count']);
                setStatus('success');
            })
            .catch(err => {
                console.error(err);
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
                            {
                                totalCount > 0 &&
                                <div className="suggested_group" key={0}>{ 
                                    data.slice(0,2).map( (item, i) => <SuggestedItem key={item._id} data={ item } i={ i }/> ) }
                                </div>
                            }
                            {
                                totalCount > 2 &&
                                <div className="suggested_group" key={1}>{ 
                                    data.slice(2,4).map( (item, i) => <SuggestedItem key={item._id} data={ item } i={ i }/> ) }
                                </div>
                            }
                            {
                                totalCount > 4 ?
                                <div className="suggested_group" key={2}>{ 
                                    data.slice(4,6).map( (item, i) => <SuggestedItem key={item._id} data={ item } i={ i }/> ) }
                                </div> : null
                            }
                        </Slider> :
                        targetDevice === 'tablet' ?
                        <Slider id="suggested_slider">
                            {
                                totalCount > 0 &&
                                <div className="suggested_group">
                                    { data.slice(0,3).map( (item, i) => <SuggestedItem data={ item } i={ i }/> ) }
                                </div>                                
                            }
                            {
                                totalCount > 3 &&
                                <div className="suggested_group">
                                    { data.slice(3,6).map( (item, i) => <SuggestedItem data={ item } i={ i }/> ) }
                                </div>
                            }
                        </Slider> :
                        <Scrollable>
                            { data.map( (item, i) => <SuggestedItem data={ item } i={ i }/> ) }
                        </Scrollable>
                    ) :
                    <Loader/>
                }
            </div>
        </div>
    );
}