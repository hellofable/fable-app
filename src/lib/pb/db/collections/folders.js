import { pb } from "$lib"





async function insert(data) {
    const token = pb.authStore.token;

    const response = await fetch('/api/folders/insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();


    if (!response.ok) {
        return result;
    }

    return { success: true, data: result };
}




async function get() {
    try {
        const folders = await pb.collection('folders').getFullList();
        return folders;
    } catch (error) {
        return error
    }
}

async function remove(docId) {
    try {
        const token = pb.authStore.token;
        const response = await fetch('/api/folders/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ docId })
        });

        const result = await response.json();

        if (!response.ok) {
            return result;
        }

        return { success: true, data: result };
    } catch (err) {
        console.error('Delete request failed:', err);
        return { success: false, error: err.message || 'Unknown error' };
    }
}



async function update(id, updatedFields) {
    const token = pb.authStore.token;

    const response = await fetch('/api/folders/update', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`

        },
        body: JSON.stringify({ id, ...updatedFields })
    });

    const result = await response.json();

    if (!response.ok) {
        return result;
    }

    return { success: true, data: result };
}




export const folders = {
    get,
    insert,
    remove,
    update
}