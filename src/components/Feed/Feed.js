import React from 'react';
import apiCall from '~/common/api-call.js';
import { useSelector } from 'react-redux';
import { SpinningLoader as Loader } from '~/components/Loader/Loader';
import FeedPost from './FeedPost.js';

import './styles/feed.scss';

import {useLogRequestStatus} from '~/debug/logRequestStatus.js';

export default function Feed() {
    const [posts, setPosts] = React.useState([]);
    const [status, setStatus] = React.useState('idle');

    function fetchPosts() {
        setStatus('pending');

        apiCall(`/posts`)
            .then(res => {
                setStatus('success');
                setPosts(res.data);
            })
            .catch( err => {
                setStatus('failed');
                console.log(err);
            });
    }

    React.useEffect(fetchPosts, []);
    useLogRequestStatus(status);

    const targetDevice = useSelector(state => state.device.target);
    const gridSize = {
        mobile: 2,
        tablet: 3,
        desktop: 4
    };

    function arrangePosts(posts, columns) {
        const arrangedPosts = [];
        let column = 0;
    
        for ( let i = 0; i < columns; i++ ) {
            arrangedPosts.push([]);  
        }
    
        posts.map(post => {
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
                    arrangePosts(posts,  gridSize['desktop']).map((column, i) => 
                        <div className="feed-grid_column" key={i}>
                            { column.map((post, i) => <FeedPost {...{...post, image: post.image.path}} i={i} key={i}/> ) }
                        </div> 
                    )  : <Loader/>
                }
            </div>
        </div>
    );
}