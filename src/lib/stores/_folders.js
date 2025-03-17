import { writable, get } from 'svelte/store';
import { _scripts } from '$lib'; // Importing _scripts from your library


function isFolderEmptyWorks(folderId, foldersStore) {
    let folders;
    foldersStore.subscribe(value => (folders = value))(); // Get the current store value of _folders

    const folder = folders.find(f => f.id === folderId);
    if (!folder) {
        console.error(`Folder with ID ${folderId} not found.`);
        return false;
    }

    // Check if the folder has any subfolders in _folders
    const hasSubfolders = folders.some(f => f.folderId === folderId);

    // Check if the folder has any scripts in _scripts
    let scripts;
    _scripts.subscribe(value => (scripts = value))();
    const hasScripts = scripts.some(s => s.folderId === folderId);

    // Return true if both are empty
    return !(hasSubfolders || hasScripts);
}

function isFolderEmpty(folderId) {
    const folders = _folders.get();
    const scripts = _scripts.get();

    let hasScripts, hasSubfolders;
    folders.forEach(folder => {
        if (folder.folderId === folderId) {
            console.log("Subfolder found:", folder);
            hasSubfolders = true; // Mark as having subfolders
        }
    });

    scripts.forEach(script => {
        if (script.folderId === folderId && !script.inTrash) {
            console.log("Subfolder found:", script);
            hasScripts = true; // Mark as having subfolders
        }
    });



    return !(hasSubfolders || hasScripts);
}



function createStore() {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        set,
        get() {
            return get({ subscribe });
        },
        update,
        isFolderEmpty: (folderId) => isFolderEmpty(folderId) // Pass _folders store as a parameter
    };
}

export const _folders = createStore();