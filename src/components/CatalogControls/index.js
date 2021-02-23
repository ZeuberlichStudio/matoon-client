import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSorting, applySorting } from '~/store/query';
import { selectTarget } from '~/store/device';
import Button from '~/components/Button/index';
import HorizontalScrollable from '~/components/HorizontalScrollable/index';
import './styles.scss';

function CatalogControls() {
    const dispatch = useDispatch();
    const currSorting = useSelector(selectSorting);
    const deviceTarget = useSelector(selectTarget);
    const sortingOptions = [
        {
            name: 'Новые',
            payload: 'meta.createdAt, -1'
        },
        {
            name: 'Дешевле',
            payload: 'prices.0.amount, -1'
        },
        {
            name: 'Дороже',
            payload: 'prices.0.amount, 1'
        }
    ]

    React.useEffect(() => console.log(deviceTarget), [deviceTarget]);

    return (
        <div id="catalog_controls" className="catalog_controls">
            <HorizontalScrollable className="catalog_controls--sorting">
                <Button 
                    text='Новые' 
                    onClick={() => dispatch(applySorting('meta.createdAt, -1'))} 
                    options={{active: 'meta.createdAt, -1' === currSorting}}
                />
                <Button 
                    text='Дешевле'
                    onClick={() => dispatch(applySorting('prices.0.amount, -1'))} 
                    options={{active: 'prices.0.amount, -1' === currSorting}}
                />
                <Button 
                    text='Дороже'
                    onClick={() => dispatch(applySorting('prices.0.amount, 1'))} 
                    options={{active: 'prices.0.amount, 1' === currSorting}}
                />
            </HorizontalScrollable>

            <div className="catalog_controls--display">
                <Button callback={() => changeDisplay('mini')}/>
                <Button callback={() => changeDisplay('full')}/>
            </div>

            <div className="catalog_controls--filters">
                <Button callback={() => {}}/>
            </div>
        </div>
    )
}

export default CatalogControls;