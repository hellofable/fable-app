import { Notyf } from 'notyf';

import 'notyf/notyf.min.css'; // for React, Vue, and Svelte

let notyf = null;
{
	notyf = new Notyf({
		duration: 3000, // Notification duration in milliseconds
		position: {
			x: 'right',
			y: 'top'
		},
		dismissible: false // Allow users to dismiss notifications
	});
}

export function toast(options) {
	if (!options || !options.type) return;

	console.log(options);

	switch (options.type) {
		case 'success':
			notyf.success(options.message || 'Operation successful');
			break;
		case 'error':
			notyf.error(options.message || 'An error occurred');
			break;
		case 'warning':
			notyf.open({
				type: 'warning',
				message: options.message || 'Warning: Check your input'
			});
			break;
		case 'info':
			notyf.open({
				type: 'info',
				message: options.message || 'Information message'
			});
			break;
		default:
			notyf.open({
				type: 'default',
				message: options.message || 'Notification'
			});
	}
}
