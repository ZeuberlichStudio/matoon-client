import React from 'react';

const { API_URL } = process.env;

function withDataFetch(Component) {
    function ProductWithDataFetch({ slug, ...props }) {
        const [data, setData] = React.useState({});
        const [status, setStatus] = React.useState('idle');
        const [error, setError] = React.useState(null);
    
        React.useEffect(() => {
            if ( status === 'idle' ) {
                fetch(`${ API_URL }products/slug=${ slug }`)
                    .then( data => data.json() )
                    .then( data => {
                        setData( data[0] );
                        setStatus('succeeded');
                    })
                    .catch( err => setError( err ) );
            }
        }, [status]);

        React.useEffect(() => setStatus('idle'), [slug])

        return status === 'succeeded' && <Component {...{ data, status, ...props }}/>
    }

    return ProductWithDataFetch;
}

function withConfig(Component) {
    function ProductWithConfig({data, status, ...props}) {
        const [variant, setVariant] = React.useState(0);
        const [config, setConfig] = React.useState({ color: 'black' });

        function findVariant() {
            const variant =
            data.variants.findIndex(item => {
                let found = false;
    
                for ( const [option, value] of Object.entries(config) ) {
                    if ( item[option] !== value ) {
                        found = false;
                        continue;
                    }
                    
                    found = true;
                }
    
                return found;
            })
            
            setVariant( variant );
        }

        React.useEffect(() => {
            if ( status === 'succeeded' ) findVariant();
        }, [status, config]);

        return <Component {...{data, config, setConfig, variant, ...props}}/>
    }

    return ProductWithConfig;
}

export { 
    withDataFetch,
    withConfig 
};