async function getCustomerById(customerId) {

    const record = await pb.collection('stripe').getFirstListItem(`customerId="${customerId}"`);
    return record;
}


export const stripe = {
    getCustomerById
}