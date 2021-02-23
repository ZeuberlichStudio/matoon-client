import {useEffect} from 'react';
import {setTarget, setPlatform} from '~/store/device';
import {useDispatch} from 'react-redux';

export default function useDevice() {
    const dispatch = useDispatch();

    function resizeHandler() {
        const width = window.innerWidth;
        const target = width > 1023 ? 'desktop' : ( width > 767 ? 'tablet' : 'mobile' );
        dispatch(setTarget(target));
        
        const height = window.innerHeight
        document.documentElement.style.setProperty('--vh', height + 'px');
    }

    useEffect(() => {
        dispatch(setPlatform(window.navigator.platform));
        resizeHandler();
        window.addEventListener('resize', resizeHandler);
        return () => { window.addEventListener('resize', resizeHandler); }
    }, []);
}