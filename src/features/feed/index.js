import React from 'react';
import { useSelector } from 'react-redux';
import FeedPost from './post';
import { SpinningLoader as Loader } from '~/features/loader';
import './styles/feed.scss';

const { API_URL } = process.env;

export default function Feed() {

    const [posts, setPosts] = React.useState([]);
    const [status, setStatus] = React.useState('idle');
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        if ( status === 'idle' ) fetchPosts();
    }, [status]);

    function fetchPosts() {
        fetch(`${ API_URL }feed`)
            .then( data => data.json() )
            .then( posts => {
                setPosts(posts);
                setStatus('success');
            })
            .catch( err => {
                setError(err);
                setStatus('failed');
            });
    }

    const targetDevice = useSelector( state => state.device.target );

    function arrangePosts(posts, columns) {
        const arrangedPosts = [];
        let column = 0;
    
        for ( let i = 0; i < columns; i++ ) {
            arrangedPosts.push([]);  
        }
    
        posts.map( post => {
            arrangedPosts[column].push(post);
    
            switch ( column === columns - 1 ) {
                case true:
                    column = 0;
                    break;
    
                default:
                    column++;
                    break;
            }
        });
    
        return arrangedPosts;
    }    

    return (
        <div id="feed" className="feed">
            <div className="feed-grid">
                { 
                    status === 'success' ?
                    arrangePosts(posts, targetDevice === 'mobile' ? 2 : targetDevice === 'tablet' ? 3 : 4 ).map((column, i) => 
                        <div className="feed-grid_column">
                            { column.map((post, i) => <FeedPost {...{ ...post, i, key: i }}/> ) }
                        </div> 
                    )  :
                    <Loader/>
                }
            </div>
        </div>
    );
}