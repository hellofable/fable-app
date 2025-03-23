import { pb, _user } from "$lib"
import { PUBLIC_API } from "$lib/env.js";


async function getOneByScriptId({ docId }) {
    const token = pb.authStore.token;

    if (!token || !docId) {
        console.error('Missing required data for getting document.');
        return { success: false, message: 'Missing required data' };
    }

    const url = PUBLIC_API + `/api/states/getOneByScriptId?docId=${docId}`;
    console.log('url:', url);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const result = await response.json();

    if (!response.ok) {
        return { success: false, message: result.message || 'Failed to fetch document' };
    }

    return result;
}

export const states = {
    getOneByScriptId
}