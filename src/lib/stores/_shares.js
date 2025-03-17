// sharesStore.js
import { writable, get } from "svelte/store";

function createSharesStore() {
    const { subscribe, set, update } = writable(null);

    return {
        subscribe,
        set,
        update,
        get() {
            return get({ subscribe });
        },
    };
}

// Create the _shares store
export const _shares = createSharesStore();

// Optional: expose to window for debugging
window._shares = _shares;
