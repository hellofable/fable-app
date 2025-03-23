import { _scripts, _user, pb } from '$lib';
import { scripts, folders, users, stripe, states } from "./collections"






// Create the db object
const db = {
	stripe,
	scripts,
	folders,
	users,
	states
};

// Export the db object
export { db };
