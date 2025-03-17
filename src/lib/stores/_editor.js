// editorStore.js
import { writable, get } from "svelte/store";

function createEditorStore() {
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

// Create independent instances for each editor store
export const _editor = createEditorStore();

// Optional: expose to window for debugging
// window.ee = _editor;
