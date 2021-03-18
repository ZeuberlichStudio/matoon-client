export function loadFromStorage(key) {
    try {
        const state = localStorage.getItem(key);
        return state ? JSON.parse(state) : undefined;
    } catch (err) {
        return undefined;
    }
}

export function saveToStorage(key, state) {
    try {
        const storageState = JSON.stringify(state);
        localStorage.setItem(key, storageState);
    } catch (err) {
        console.error(err);
    }
}