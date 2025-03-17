import { pb, _user } from "$lib"
import _ from 'lodash';
import { PUBLIC_API } from "$lib/env.js";




async function insert(data) {
    try {
        const token = pb.authStore.token;
        const response = await fetch(PUBLIC_API + '/api/users/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`

            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            return { success: false, error: result.error || 'Failed to insert user' };
        }

        return result;
    } catch (err) {
        console.error('Request failed:', err);
        return { success: false, error: err.message || 'Unknown error' };
    }
}


async function remove(docId) {
    try {
        const token = pb.authStore.token;
        const response = await fetch(PUBLIC_API + '/api/users/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`

            },
            body: JSON.stringify({ docId })
        });

        const result = await response.json();

        if (!response.ok) {
            return { success: false, error: result.error || 'Failed to delete user' };
        }

        return result;
    } catch (err) {
        console.error('Delete request failed:', err);
        return { success: false, error: err.message || 'Unknown error' };
    }
}


async function update(id, updatedFields) {
    try {
        const token = pb.authStore.token;
        const response = await fetch(PUBLIC_API + '/api/users/update', {
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


async function updateSetting(keyPath, value) {
    // Fetch current settings (assuming they are available in `currentSettings`)
    const user = _user.get();
    let currentSettings = user.settings;

    // Ensure currentSettings is defined
    if (!currentSettings) {
        // Handle the case where there are no current settings
        currentSettings = {};
    }

    // Use lodash to set the value at the specified path in the settings object
    _.set(currentSettings, keyPath, value);


    update(user.id, { settings: currentSettings })
}







export const users = {
    insert,
    remove,
    update,
    updateSetting
}