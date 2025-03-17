import { writable, get } from 'svelte/store';

function createStore() {
    const { subscribe, set } = writable([]);

    return {
        subscribe,
        set,
        get() {
            return get({ subscribe });
        },
    };
}

export const _checkpointsMeta = createStore();
