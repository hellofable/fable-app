export async function checkIfOwner({ pb, collection, id, userId }) {
    try {
        const record = await pb.collection(collection).getOne(id);
        return record.ownerId === userId;
    } catch (error) {
        console.error('Error checking ownership:', error);
        return false;
    }
}