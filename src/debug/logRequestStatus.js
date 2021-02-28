import {useEffect} from 'react';

export function useLogRequestStatus(status) {
    useEffect(() => console.log(status), [status]);
}