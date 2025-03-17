import { get } from 'svelte/store';
import { _popup } from '$lib';

export async function showPopup(args) {
	_popup.set(args);
	return await show();
}

function show() {
	const popupElement = document.getElementById('popup');
	const popup = new bootstrap.Modal(popupElement, {
		keyboard: true,
		backdrop: 'static'
	});

	popup.isSubmitting = (newValue) => {
		_popup.update((currentPopup) => {
			return { ...currentPopup, isSubmitting: newValue };
		});

		console.log('isSubmitting');
		// Your logic here
	};

	return new Promise((resolve) => {
		const confirmButton = document.getElementById('confirmButton');
		const cancelButton = document.getElementById('cancelButton');

		function handleConfirm() {
			resolve({ popup, message: 'confirmed' });
			cleanup();
		}

		function handleCancel() {
			resolve({ popup, message: 'cancelled' });
			cleanup();
		}

		function cleanup() {
			confirmButton.removeEventListener('click', handleConfirm);
			cancelButton.removeEventListener('click', handleCancel);
		}

		confirmButton.addEventListener('click', handleConfirm);
		cancelButton.addEventListener('click', handleCancel);

		popup.show();
	});
}
