import { pb, _user, addSectionsToScriptText } from "$lib"
import { PUBLIC_API } from "$lib/env.js";


async function insert(data) {
    try {
        const token = pb.authStore.token;
        const response = await fetch(PUBLIC_API + '/api/scripts/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`

            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            return { success: false, error: result.error || 'Request failed' };
        }

        return result;
    } catch (err) {
        console.error('Request failed:', err);
        return { success: false, error: err.message || 'Unknown error' };
    }
}

async function get() {
    try {
        const scripts = await pb.collection('scripts').getFullList();
        return scripts;
    } catch (error) {
        return error
    }
}

async function update(id, updatedFields) {
    try {
        const token = pb.authStore.token;
        const response = await fetch(PUBLIC_API + '/api/scripts/update', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`

            },
            body: JSON.stringify({ id, ...updatedFields })
        });

        const result = await response.json();

        if (!response.ok) {
            return { success: false, error: result.error || 'Failed to update script' };
        }

        return result;
    } catch (err) {
        console.error('Update error:', err);
        return { success: false, error: err.message || 'Unknown error' };
    }
}

async function remove(docId) {
    try {
        const token = pb.authStore.token;
        const response = await fetch(PUBLIC_API + '/api/scripts/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`

            },
            body: JSON.stringify({ docId })
        });

        const result = await response.json();

        if (!response.ok) {
            return { success: false, error: result.error || 'Failed to delete folder' };
        }

        return result;
    } catch (err) {
        console.error('Delete request failed:', err);
        return { success: false, error: err.message || 'Unknown error' };
    }
}

async function importFromText(filename, fileContents) {


    // addSectionsToScriptText(fileContents);
    // return

    const fixedTitle = filename.split('.')[0] + ' (imported)';

    const fields = {
        title: fixedTitle,
        synopsis: '',
        import: fileContents,
        folderId: 'root'
    }

    return insert(fields);

}

async function addShare({ scriptId, email }) {
    const token = pb.authStore.token;

    if (!token || !email || !scriptId) {
        console.error('Missing required data for sharing script.');
        return { success: false, message: 'Missing required data' };
    }

    try {
        const response = await fetch(PUBLIC_API + '/api/scripts/addShare', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ email, scriptId })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to share script');
        }

        return result;
    } catch (error) {
        console.error('Error sharing script:', error.message);
        return { success: false, message: error.message };
    }
}

async function removeShare({ scriptId, userId }) {

    // Fetch the script document
    const script = await pb.collection('scripts').getOne(scriptId);
    if (!script) {
        return { success: false, message: 'Script not found' };
    }

    // Ensure shares field exists
    const shares = script.shares || [];

    // Check if user exists in shares
    const updatedShares = shares.filter((share) => share.sharedWith !== userId);

    if (shares.length === updatedShares.length) {
        return { success: false, message: 'User not found in shares' };
    }

    // Update the script's shares field
    await pb.collection('scripts').update(scriptId, { shares: updatedShares });
}



export const scripts = {
    get,
    importFromText,
    insert,
    remove,
    update,
    addShare,
    removeShare
}