import { _scripts, _user, pb } from '$lib';
import { scripts, folders, users, stripe } from "./collections"






// Create the db object
const db = {
	stripe,
	scripts,
	folders,
	users
};

// Export the db object
export { db };
